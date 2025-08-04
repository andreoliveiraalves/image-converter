<template>
  <div>
    <div class="top-right-controls">
      <ThemeToggle />
      <LangToggle />
    </div>
    <div class="main-container d-flex flex-column p-3">
      <h2 class="main-title m-auto p-1 mb-3 animated-title"
        @mouseleave="titleHovered = false">
        {{ $t("main-title") }}
      </h2>
      <h5 class="title m-auto p-2 animated-title" @mouseenter="titleHovered = true"
        @mouseleave="titleHovered = false">
        {{ $t("title") }} <span class="no-gradient emoji-bounce" :class="{ 'bounce': titleHovered }">🎨</span>
      </h5>
      <div class="selector-container fade-in">
        <Selector />
      </div>
    </div>

    <!-- Floating particles background -->
    <div class="particles-container">
      <div class="particle" v-for="n in 15" :key="n" :style="getParticleStyle(n)"></div>
    </div>
  </div>
</template>

<script>
import ThemeToggle from './components/ThemeToggle.vue'
import LangToggle from './components/LangToggle.vue'
import Selector from './components/Selector.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'App',
  components: {
    ThemeToggle,
    LangToggle,
    Selector
  },
  data() {
    return {
      isDark: true, // por omissão true (dark) 
      storageKey: 'color-scheme',
      titleHovered: false
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
    },
    getParticleStyle(index) {
      const delay = index * 0.5;
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const duration = Math.random() * 20 + 10;

      return {
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      };
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
  --glow-color1: rgba(102, 126, 234, 0.3);
  --glow-color2: rgba(102, 126, 234, 0.5);
}

.dark {
  --glow-color1: rgba(168, 237, 234, 0.3);
  --glow-color2: rgba(168, 237, 234, 0.5);
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

/* Particles background */
.particles-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  background: rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  animation: float-up linear infinite;
}

.dark .particle {
  background: rgba(168, 237, 234, 0.2);
}

@keyframes float-up {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

.top-right-controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.main-container {
  margin-top: 10vh !important;
  position: relative;
  z-index: 2;
}

.title, .main-title {
  font-size: 2em;
  font-weight: 700;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  letter-spacing: -0.02em;
  line-height: 1.1;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  transform-origin: center;
}

.title {
  font-size: 1.3em;
}

.animated-title {
  position: relative;
  overflow: hidden;
}

.animated-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
  z-index: 1;
}

.animated-title:hover::before {
  left: 100%;
}

.animated-title:hover {
  transform: scale(1.05) translateY(-5px);
  filter: drop-shadow(0 10px 20px var(--glow-color1));
}

/* Emoji bounce effect */
.emoji-bounce {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.emoji-bounce.bounce {
  animation: bounce-fun 0.6s ease-in-out;
}

@keyframes bounce-fun {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  25% {
    transform: translateY(-10px) rotate(-5deg);
  }

  50% {
    transform: translateY(-15px) rotate(0deg) scale(1.2);
  }

  75% {
    transform: translateY(-5px) rotate(5deg);
  }
}

/* Dark theme specific */
.dark .title {
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dark .animated-title:hover {
  filter: drop-shadow(0 10px 20px var(--glow-color1));
}

/* Glass morphism effect */
.title.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 0.5em 1em;
  color: inherit;
  background-clip: padding-box;
  -webkit-background-clip: padding-box;
  -webkit-text-fill-color: inherit;
}

.light .title.glass {
  color: #333;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.dark .title.glass {
  color: #fff;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.title .no-gradient {
  background: none !important;
  -webkit-background-clip: initial !important;
  background-clip: initial !important;
  -webkit-text-fill-color: initial !important;
  color: inherit !important;
}

/* Fade in animation for content */
.fade-in {
  animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Selector container hover effect */
.selector-container {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 16px;
  margin-top: 3vh;
}

.selector-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.dark .selector-container:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Pulsing glow effect using CSS variables */
.pulse-glow {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {

  0%,
  100% {
    box-shadow: 0 0 20px var(--glow-color1);
  }

  50% {
    box-shadow: 0 0 30px var(--glow-color2);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .title {
    font-size: 1.3em;
  }

  .animated-title:hover {
    transform: scale(1.02) translateY(-3px);
  }

  .particles-container {
    display: none;
    /* Hide particles on mobile for performance */
  }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {

  .particle,
  .animated-title,
  .emoji-bounce,
  .fade-in,
  .selector-container,
  .pulse-glow {
    animation: none !important;
    transition: none !important;
  }

  .particles-container {
    display: none;
  }
}
</style>