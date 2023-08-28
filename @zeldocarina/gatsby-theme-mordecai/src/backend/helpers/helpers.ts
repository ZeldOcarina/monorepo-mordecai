import type { PhoneNumber } from "google-libphonenumber"
import googleLibphonenumber, {
  PhoneNumberFormat as PNF,
} from "google-libphonenumber"

const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance()

export const normalizePhoneNumber: (
  phoneNumber: string,
) => string = phoneNumber => {
  const phoneInstance: PhoneNumber = phoneUtil.parse(phoneNumber, "US")
  if (!phoneUtil.isValidNumberForRegion(phoneInstance, "US")) {
    throw new Error("Invalid phone number")
  }

  // Parse the phone number to be +17275689845
  const parsedPhone = phoneUtil.format(phoneInstance, PNF.NATIONAL)

  // console.log(parsedPhone);

  return phoneNumber
}

export const isUrlValid = (url: string) => {
  try {
    const parsedUrl = new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function isMongoError(err: unknown): err is { errors: any } {
  // First, check if err is an object
  const isObject =
    err !== null && typeof err === "object" && !Array.isArray(err)

  // If err is an object, then check if it has the 'errors' property
  return isObject && "errors" in (err as Record<string, any>)
}
