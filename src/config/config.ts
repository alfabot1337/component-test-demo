import { ApplicationConfig, Language } from '../types/config'

const AppConfig: ApplicationConfig = {
  language: Language.EN,
  shouldShowPolicyOnLoginPage: true,
}

export const config = {
  getConfig: (): ApplicationConfig => AppConfig,
}
