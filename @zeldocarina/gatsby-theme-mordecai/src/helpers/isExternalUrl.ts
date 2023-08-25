export default function isExternalUrl(url: unknown) {
    if(!(typeof url === "string")) throw new Error("Checked url must be a string");
    if(url.startsWith("http") || url.startsWith("tel") || url.startsWith("mailto")) return true;
    try {
        new URL(url);
        return true;
    } catch(err) {
        return false;
    }
}