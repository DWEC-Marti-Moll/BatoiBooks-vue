<script setup>
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart.js'

const route = useRoute()
const cartStore = useCartStore()

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
      <li class="cart-item">
        <router-link :to="{ name: 'Cart' }" :class="{ active: isActive('/cart') }">
          <span class="material-icons">shopping_cart</span>
          <span v-if="cartStore.cartCount > 0" class="cart-badge">{{ cartStore.cartCount }}</span>
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