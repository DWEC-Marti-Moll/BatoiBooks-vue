<script setup>
import { store } from '../stores/datos.js'
</script>

<template>
  <div class="cart-view">
    <h2>Carrito de Compra</h2>
    <div class="cart-container">
      <div v-if="store.cart.length === 0" class="empty-cart">
        <p>El carrito está vacío</p>
        <router-link to="/books" class="btn-primary">Ver libros</router-link>
      </div>
      <div v-else>
        <p>Próximamente: funcionalidad completa del carrito</p>
      </div>
    </div>
  </div>
</template>