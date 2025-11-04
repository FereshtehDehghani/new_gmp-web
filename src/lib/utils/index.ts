import clsx from "clsx";
import { ClassNameValue, twMerge } from "tailwind-merge";

export function cn(...inputs: ClassNameValue[]) {
  return twMerge(clsx(inputs))
}
export function toPersianDigits(number: number | string): string {
  const persianDigits = [".", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return number
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

export const remainingDay = (expiryDate: string) => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log("diffDays", diffDays);
  return diffDays > 0 ? diffDays : 0;
};

export const convertToPersianDateFormat = (date: Date) => {
  const parts = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(date);

  const formatted = `${parts.find((p) => p.type === "day")?.value}-${
    parts.find((p) => p.type === "month")?.value

    // @ts-ignore
  }-${parts.find((p) => p.type === "yearName")?.value}`;

  return formatted;
};

export const isValidatePhoneNumber = (number: string) => {
  var regex = new RegExp("^(\\+98|0)?9\\d{9}$");
  var result = regex.test(number);
  return result;
};

export const getUserFullName = (user: IUser) => {
  return user?.fullName ? user?.fullName : `${user?.name} ${user?.lastName}`;
};

export function convertToPersianNumbers(text: string, convertDots = true) {
  if (typeof text !== "string") {
    return text;
  }

  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  let result = text;

  // Convert English numbers to Persian numbers
  for (let i = 0; i < englishNumbers.length; i++) {
    const regex = new RegExp(englishNumbers[i], "g");
    result = result.replace(regex, persianNumbers[i]);
  }

  // Convert dot (.) to Persian zero (۰) if enabled
  // if (convertDots) {
  //   result = result.replace(/\./g, "۰");
  // }

  return result;
}



  

