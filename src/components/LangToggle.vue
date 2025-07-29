<template>
    <button class="lang-toggle" @click="toggleLang">
        {{ currentLang }}
    </button>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
    name: 'LangToggle',
    setup() {
        const { locale } = useI18n()
        const toggleLang = () => {
            locale.value = locale.value === 'en' ? 'pt' : 'en'
        }
        const currentLang = computed(() => locale.value.toUpperCase())
        return {
            toggleLang,
            currentLang
        }
    }
}
</script>

<style scoped>
.lang-toggle {
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: 9999px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Tema Escuro */
.dark .lang-toggle {
    color: #e2e8f0;
}

/* Hover no modo escuro */
.dark .lang-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

/* Tema Claro */
.light .lang-toggle {
    color: #334155;
}

/* Hover no modo claro */
.light .lang-toggle:hover {
    background: rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
}

/* Animações */
@keyframes pulse {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.05);
    }

    100% {
        transform: scale(1);
    }
}

.lang-toggle:hover {
    animation: pulse 0.5s ease-out;
}
</style>