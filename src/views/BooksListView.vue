<script setup>
import { onMounted } from 'vue'
import { useBooksStore } from '../stores/books.js'
import { useModulesStore } from '../stores/modules.js'
import BookList from '../components/BookList.vue'

const booksStore = useBooksStore()
const modulesStore = useModulesStore()

onMounted(() => {
  booksStore.fetchBooks()
  modulesStore.fetchModules()
})
</script>

<template>
  <div class="books-view">
    <h2>Lista de Libros</h2>
    <BookList />
    
    <div class="totales-bar">
      <span>Total Libros: <strong>{{ booksStore.totalBooks }} </strong></span>
      <span>Importe Total: <strong>{{ booksStore.totalAmount }} €</strong></span>
    </div>
  </div>
</template>