const emailRegex = /^\S+@\S+\.\S+$/
const uaPhoneRegex = new RegExp('^[+]380[0-9]{2}-[0-9]{3}-[0-9]{4}$')

export const isValidEmailAddress = (emailAddress: string): boolean =>
  emailRegex.test(emailAddress)

export const isValidPhoneNumber = (phoneNumber: string): boolean =>
  uaPhoneRegex.test(phoneNumber)
