const isBrowser = typeof window !== "undefined"

export const encodeForm = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&")
}

export const parseParams = search => {
  const params = new URLSearchParams(search)

  if (params.toString() === "") return params
  const hasGclid = params.has("gclid")
  if (hasGclid) {
    if (!params.has("utm_source")) params.append("utm_source", "Google")
    if (!params.has("utm_campaign")) params.append("utm_campaign", "Google Ads")
    if (!params.has("utm_content"))
      params.append("utm_content", params.get("gclid"))
  }
  return params
}

export const createLinkWithParams = (originalLink, params) => {
  if (!isBrowser) return
  return params.toString()
    ? `${originalLink}?${params.toString()}`
    : originalLink
}
