export interface IShortcode {
  [key: string]: { shortcode: string; value: string }
}

export default class ShortcodesParser {
  constructor(
    private inputData: string,
    private shortcodes: IShortcode,
  ) {
    if (!this.inputData) return
    if (typeof inputData !== "string")
      throw new Error(
        "ShortcodesParser inputData is supposed to be a string but got " +
          typeof inputData,
      )
    this.parseShortcodes()
  }

  parseShortcodes() {
    if (!this.inputData) return

    // Loop the shortcodes object and replace the object.shortcode with object.value
    Object.keys(this.shortcodes).forEach(key => {
      this.inputData = this.inputData.replaceAll(
        this.shortcodes[key].shortcode,
        this.shortcodes[key].value,
      )
    })
    return this.inputData
  }
}
