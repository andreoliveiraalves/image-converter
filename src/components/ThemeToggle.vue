<template>
  <div class="theme-toggle-container">
    <button class="theme-toggle" @click="toggleTheme">
      <span v-if="!isDark">☀️</span>
      <span v-else>🌙</span>
    </button>
  </div>
</template>

<script setup>
import { useDark } from '@vueuse/core'

const isDark = useDark()
const toggleDark = () => isDark.value = !isDark.value

const toggleTheme = () => {
  toggleDark()
  const root = document.documentElement
  if (isDark.value) {
    root.classList.add('dark')
    root.classList.remove('light')
  } else {
    root.classList.remove('dark')
    root.classList.add('light')
  }
  localStorage.setItem('vueuse-color-scheme', isDark.value ? 'dark' : 'light')
}
</script>

<style scoped>
.theme-toggle {
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
.dark .theme-toggle {
  color: #e2e8f0;
}

/* Hover no modo escuro */
.dark .theme-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

/* Tema Claro */
.light .theme-toggle {
  color: #334155;
}

/* Hover no modo claro */
.light .theme-toggle:hover {
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

.theme-toggle:hover {
  animation: pulse 0.5s ease-out;
}
</style>