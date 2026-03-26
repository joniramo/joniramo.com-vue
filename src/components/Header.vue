<template>
  <header>
    <div class="header-content">
      <router-link class="logo-link" to="/">
        <Logo />
      </router-link>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/cv">CV</router-link>
        <router-link to="/blog">Blog</router-link>
      </nav>
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from "./Logo.vue";
import ThemeToggle from "./ThemeToggle.vue";
</script>

<style scoped>
header {
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
  z-index: 2;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--content-max-width);
  margin: 0 auto;
}

.logo {
  height: 2.75rem;
  width: 2.75rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 0 auto;
}

nav a {
  background-color: transparent;
  transition:
    color 0.1s ease-in,
    box-shadow 0.2s ease-in-out;
}

nav a {
  background-image: none; /* Removes underline animation. */
}

.logo-link {
  background-image: none; /* Removes underline animation. */
}

body.light {
  nav a {
    font-size: 0.875rem;
  }

  nav a.router-link-active,
  nav a.router-link-exact-active {
    color: var(--text-dark);
    box-shadow: inset 100px 0 0 0 var(--highlight-light);
  }

  nav a {
    color: var(--text-light);
    box-shadow: inset 0 0 0 0 var(--highlight-light);
    margin: 0 -0.25rem;
    padding: 0 0.25rem;
  }

  nav a:hover {
    color: var(--text-dark);
    box-shadow: inset 100px 0 0 0 var(--highlight-light);
  }
}

body.dark {
  nav a {
    font-size: 0.875rem;
  }

  nav a.router-link-active,
  nav a.router-link-exact-active {
    color: var(--text-light);
    box-shadow: inset 100px 0 0 0 var(--highlight-dark);
  }

  nav a {
    color: var(--text-dark);
    box-shadow: inset 0 0 0 0 var(--highlight-dark);
    margin: 0 -0.25rem;
    padding: 0 0.25rem;
  }

  nav a:hover {
    color: var(--text-light);
    box-shadow: inset 100px 0 0 0 var(--highlight-dark);
  }
}

@media (max-width: 600px) {
  .logo {
    height: 2.2rem;
    width: 2.2rem;
  }

  nav {
    gap: 1rem;
  }
}
</style>
