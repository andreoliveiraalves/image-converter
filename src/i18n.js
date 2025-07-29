import { createI18n } from 'vue-i18n'

import en from './locales/en.json'
import pt from './locales/pt.json'

const messages = {
    en,
    pt
}

export const i18n = createI18n({
    legacy: false,       // usar Composition API style
    locale: 'pt',        // idioma padrão
    fallbackLocale: 'en',
    messages
})