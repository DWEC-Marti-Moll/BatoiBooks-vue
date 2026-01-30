<script setup>
import { onMounted } from 'vue'
import { store } from '../stores/datos.js'
import BookList from '../components/BookList.vue'

onMounted(() => {
  store.fetchBooks()
  store.fetchModules()
})
</script>

<template>
  <div class="books-view">
    <h2>Lista de Libros</h2>
    <BookList />
    
    <div class="totales-bar">
      <span>Total Libros: <strong>{{ store.totalLibros }}</strong></span>
      <span>Importe Total: <strong>{{ store.importeTotal }} €</strong></span>
    </div>
  </div>
</template>