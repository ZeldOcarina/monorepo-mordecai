export default class ShortcodesParser {
    constructor(inputData, shortcodes) {
        this.inputData = inputData;
        this.shortcodes = shortcodes;
        this.parseShortcodes();
    }

    parseShortcodes() {
        if (!this.inputData) return;
        // Loop the shortcodes object and replace the object.shortcode with object.value
        Object.keys(this.shortcodes).forEach(key => {
            this.inputData = this.inputData.replaceAll(this.shortcodes[key].shortcode, this.shortcodes[key].value);
        })

        return this.inputData
    }
}