<script setup>
import { store } from '../stores/datos.js'
</script>

<template>
    <div class="cart-panel">
        <h3>Carrito de Compra</h3>
        <div v-if="store.cart.length === 0" class="empty">
            <p>El carrito está vacío</p>
        </div>
        <ul v-else class="cart-list">
            <li v-for="(item, index) in store.cart" :key="index">
                {{ item.title || 'Libro ' + item.id }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.cart-panel {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  position: sticky;
  top: 20px;
}

h3 { 
  margin-top: 0; 
  color: var(--text); 
  border-bottom: 1px solid var(--border); 
  padding-bottom: 10px; 
  font-weight: 600;
}

.empty { 
  color: var(--text-light); 
  font-style: italic; 
  padding: 0.5rem 0;
}

.cart-list { 
  list-style: none; 
  padding: 0; 
  margin: 0; 
}

.cart-list li { 
  padding: 8px 0; 
  border-bottom: 1px solid var(--border); 
  font-size: 0.95rem; 
}

.cart-list li:last-child {
  border-bottom: none;
}
</style>