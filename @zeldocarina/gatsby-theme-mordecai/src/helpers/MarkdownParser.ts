import { unified } from "unified"
import markdown from "remark-parse"
import html from "remark-html"
import parse from "html-react-parser"

export interface IFlatShortcode {
  shortcode: string
  value: string
}
export default class MarkdownParser {
  inputMarkdown: string
  shortcodes: IFlatShortcode[]
  parsedMarkdown: string

  constructor({
    inputMarkdown,
    shortcodes,
  }: {
    inputMarkdown: string
    shortcodes: IFlatShortcode[]
  }) {
    this.inputMarkdown = inputMarkdown
    this.shortcodes = shortcodes
    this.parsedMarkdown = inputMarkdown

    this.parseMarkdown()
    this.replacePrivacyAndTerms()
    if (this.shortcodes) {
      this.replacePhoneNumbers()
      this.replaceShortcodes()
    }
  }

  parseMarkdown() {
    // Find the code inside an iframe and replace the src after "https://www.youtube.com/embed/ with the codeId
    this.parsedMarkdown = unified()
      .use(markdown)
      .use(html, {
        sanitize: false,
      })
      .processSync(this.inputMarkdown)
      .toString()

    const videoIdRegex =
      /src="https:\/\/www\.youtube\.com\/embed\/([\w\\_-]+?)"/
    const codeId = this.parsedMarkdown.match(videoIdRegex)
    if (codeId) {
      const unescapedVideoId = codeId[1].replaceAll(`\\`, "")
      this.parsedMarkdown = this.parsedMarkdown.replace(
        codeId[1],
        unescapedVideoId,
      )
    }
  }

  replaceShortcodes() {
    // console.log(this.shortcodes);
    this.shortcodes.forEach(shortcode => {
      this.parsedMarkdown = this.parsedMarkdown.replaceAll(
        shortcode.shortcode,
        shortcode.value,
      )
    })
  }

  replacePhoneNumbers() {
    // console.log("Replacing phone numbers");
    // console.log(this.shortcodes);
    debugger

    const tel = this.shortcodes.find(
      item => item.shortcode === "{{ tel }}",
    )?.value
    const phone = this.shortcodes.find(
      item => item.shortcode === "{{ phone }}",
    )?.value

    if (!tel || !phone) return ""

    this.parsedMarkdown = this.parsedMarkdown.replaceAll(
      "{{ tel-component }}",
      `<a href="tel:${tel}">${phone}</a>`,
    )
  }

  replacePrivacyAndTerms() {
    this.parsedMarkdown = this.parsedMarkdown
      .replaceAll(
        "{{ terms-of-use }}",
        `<a href="/terms-of-use/">terms of use</a>`,
      )
      .replaceAll(
        "{{ privacy-policy }}",
        `<a href="/privacy-policy/">privacy policy</a>`,
      )
  }

  parseHtml() {
    return parse(this.parsedMarkdown)
  }
}
