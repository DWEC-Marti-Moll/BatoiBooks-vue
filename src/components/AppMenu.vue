<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => {
  return route.path === path
}
</script>

<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: 'Books' }" :class="{ active: isActive('/books') || isActive('/') }">
          Ver Libros
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AddBook' }" :class="{ active: isActive('/add-book') }">
          Nuevo Libro
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Cart' }" :class="{ active: isActive('/cart') }">
          Ver Carrito
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'About' }" :class="{ active: isActive('/about') }">
          About
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav { 
  display: flex; 
  gap: 24px; 
}

a { 
  text-decoration: none; 
  color: var(--text-muted); 
  font-weight: 500; 
  font-size: 0.95rem; 
  transition: color 0.2s; 
}

a:hover, a.active { 
  color: var(--primary); 
}
</style>