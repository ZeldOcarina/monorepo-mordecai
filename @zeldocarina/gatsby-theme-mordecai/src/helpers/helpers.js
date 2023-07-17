import MarkdownParser from "./MarkdownParser"
import slugify from "slugify"

export const setColumns = function (isPhonePort, columns) {
    if (isPhonePort) return 1
    if (columns) return columns
    else return 2
}

export const hexToRGB = function (hex, alpha) {
    if (!hex || hex === "") return "rgb(255, 255, 255, 0)";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (alpha || alpha === 0) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

export const parseMarkdown = ({ inputMarkdown, businessName, businessAddress, zipCode, city, state, businessEmail, tel, phone, siteUrl }) => {
    const markdownParser = new MarkdownParser({ inputMarkdown, businessName, businessAddress, zipCode, city, state, businessEmail, tel, phone, siteUrl });
    return markdownParser.parseHtml();
}

export const buildLink = (originalLink, cityState) => {
    return originalLink.replaceAll("{{ city-state }}", slugify(cityState.toLowerCase()));
}

export const findNextItem = (itemsArray, currentRowNumber) => {
    return itemsArray.find(item => item.data.rowNumber === currentRowNumber + 1)
}