export enum Language {
  EN = 'en',
  UA = 'ua',
}
export interface ApplicationConfig {
  language: Language
  shouldShowPolicyOnLoginPage: boolean
}
