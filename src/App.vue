<template>
  <div>
    <div class="top-right-controls">
      <ThemeToggle />
      <LangToggle />
    </div>
  </div>
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue'
import LangToggle from './components/LangToggle.vue'

export default {
  name: 'App',
  components: {
    ThemeToggle,
    LangToggle
  },
  data() {
    return {
      isDark: true, // por omissão true (dark)
      storageKey: 'vueuse-color-scheme'
    }
  },
  methods: {
    setDarkClass(value) {
      const htmlEl = document.documentElement
      if (value) {
        htmlEl.classList.add('dark')
        htmlEl.classList.remove('light')
      } else {
        htmlEl.classList.add('light')
        htmlEl.classList.remove('dark')
      }
      this.isDark = value
      // Guarda no localStorage
      localStorage.setItem(this.storageKey, value ? 'dark' : 'light')
    },
    loadFromStorage() {
      const stored = localStorage.getItem(this.storageKey)
      if (stored === 'dark') {
        this.setDarkClass(true)
      } else if (stored === 'light') {
        this.setDarkClass(false)
      } else {
        // Se não houver nada guardado, define dark por omissão
        this.setDarkClass(true)
      }
    }
  },
  mounted() {
    this.loadFromStorage()
  }
}
</script>

<style>
:root {
  --bg-dark: linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%);
  --bg-light: linear-gradient(to right, #f4f4f4 0%, #e9e9e9 20%, #f4f4f4 40%, #e9e9e9 60%, #f4f4f4 80%, #e9e9e9 100%);
}

body {
  margin: 0;
  height: 100vh;
  overflow: hidden;
  background: var(--bg-light);
  transition: background 0.3s ease;
}

html.dark body {
  background: var(--bg-dark);
}

.top-right-controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}
</style>