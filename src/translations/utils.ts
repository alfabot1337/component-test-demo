import { config } from '../config'
import { Language } from '../types/config'
import { Translations } from '../types/translations'

import { en } from './en'
import { ua } from './ua'

const translations = {
  [Language.EN]: en,
  [Language.UA]: ua,
}

export const translate = (key: keyof Translations): string => {
  const { language } = config.getConfig()

  return translations[language][key] || key
}
