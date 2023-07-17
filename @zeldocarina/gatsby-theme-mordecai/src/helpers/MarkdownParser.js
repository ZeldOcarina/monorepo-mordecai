import { unified } from "unified"
import markdown from "remark-parse"
import html from "remark-html"
import parse from "html-react-parser"

export default class MarkdownParser {
    constructor({ inputMarkdown, businessName, businessAddress, zipCode, city, state, businessEmail, tel, phone, siteUrl }) {
        this.inputMarkdown = inputMarkdown;
        this.businessName = businessName;
        this.businessAddress = businessAddress;
        this.zipCode = zipCode;
        this.city = city;
        this.state = state;
        this.businessEmail = businessEmail;
        this.tel = tel;
        this.phone = phone;
        this.siteUrl = siteUrl;

        this.parseMarkdown();
        if (this.businessName) this.replaceBusinessName();
        if (this.businessAddress) this.replaceBusinessAddress();
        if (this.zipCode) this.replaceZipCode();
        if (this.city && this.state) this.replaceCityState();
        if (this.businessEmail) this.replaceBusinessEmail();
        if (this.tel && this.phone) this.replacePhoneNumbers();
        if (this.siteUrl) this.replaceSiteUrl();
    }

    parseMarkdown() {
        this.parsedMarkdown = unified().use(markdown).use(html).processSync(this.inputMarkdown).value;
    }

    replaceBusinessName() {
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ business-name }}", this.businessName)
    }

    replaceBusinessAddress() {
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ business-address }}", this.businessAddress)
    }

    replaceZipCode() {
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ business-zipcode }}", this.zipCode)
    }

    replaceCityState() {
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ city-state }}", `${this.city}, ${this.state}`)
    }

    replaceBusinessEmail() {
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ business-email }}", this.businessEmail);
    }

    replacePhoneNumbers() {
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ tel-component }}", `<a href="tel:${this.tel}">${this.phone}</a>`)
    }

    replaceSiteUrl() {
        this.parsedMarkdown = this.parsedMarkdown.replaceAll("{{ site-url }}", this.siteUrl)
    }

    parseHtml() {
        return parse(this.parsedMarkdown);
    }
}