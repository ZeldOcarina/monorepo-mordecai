import isExternalUrl from "./isExternalUrl";

it("returns true if url starts with http", () => {
    const urlToBeTested = "http://google.com";
    expect(isExternalUrl(urlToBeTested)).toBe(true)
})

it("returns true if url starts with https", () => {
    const urlToBeTested = "https://google.com";
    expect(isExternalUrl(urlToBeTested)).toBe(true)
})

it("returns true if url starts with tel", () => {
    const urlToBeTested = "tel:+1234567890";
    expect(isExternalUrl(urlToBeTested)).toBe(true)
})

it("returns true if url starts with mailto", () => {
    const urlToBeTested = "mailto:joedoe@gmail.com";
    expect(isExternalUrl(urlToBeTested)).toBe(true)
})

it("returns false on relative urls", () => {
    const urlToBeTested = "/ciao/yes?hello-world=true#hashing";
    expect(isExternalUrl(urlToBeTested)).toBe(false)
});

it("returns false on non url-like strings", () => {
    const urlToBeTested = "I am a weird, non url string";
    expect(isExternalUrl(urlToBeTested)).toBe(false)
});

it("throws an error if non-string value is passed", () => {
    const urlToBeTested = { 12345: "no" };
    expect(() => isExternalUrl(urlToBeTested)).toThrow("Checked url must be a string");
});