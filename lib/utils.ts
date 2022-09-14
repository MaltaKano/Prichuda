import siteConfig from "site.config"

export function truncate(value: string, length: number, suffix = "...") {
  if (value.length < length) {
    return value
  }

  return value.slice(0, length) + suffix
}

export function absoluteURL(uri: string) {
  return `${siteConfig.drupalBaseUrl}${uri}`
}

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function formatDateDay(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
  })
}

export function formatDateShort(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("ru-RU", {
    month: "short",
  })
}

export function formatDateYear(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("ru-RU", {
    year: "numeric",
  })
}

export function isRelative(url: string) {
  return !new RegExp("^(?:[a-z]+:)?//", "i").test(url)
}
