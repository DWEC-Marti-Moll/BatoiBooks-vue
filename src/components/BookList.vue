<script setup>
import { useRouter } from 'vue-router'
import { store } from '../stores/datos.js'
import BookItem from './BookItem.vue'

const router = useRouter()

const eliminar = (book) => {
  const mod = store.getModuleByCode(book.moduleCode)
  const nombreModulo = mod ? mod.cliteral : 'Desconocido'

  if (confirm(`¿Va a borrar el libro con ID: ${book.id} del módulo: ${nombreModulo}?`)) {
    store.deleteBook(book.id)
    store.addMessage(`Libro ${book.id} eliminado`)
  }
}

const editar = (book) => {
  router.push({ name: 'EditBook', params: { id: book.id } })
}
</script>

<template>
  <div class="books-grid-container">
    <BookItem v-for="book in store.books" :key="book.id" :book="book">
      <div class="actions">
        <button class="btn-icon" disabled title="Próximamente">
          <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="btn-icon" @click="editar(book)" title="Editar">
          <span class="material-icons">edit</span>
        </button>
        <button class="btn-icon btn-delete" @click="eliminar(book)" title="Eliminar">
          <span class="material-icons">delete</span>
        </button>
      </div>
    </BookItem>
  </div>
</template>

<style scoped>
.books-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.actions {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s;
}

.btn-icon:hover:not(:disabled) {
  background: #dbeafe;
  color: var(--primary);
  border-color: var(--primary);
}

.btn-delete:hover {
  background: #fee2e2;
  color: var(--error);
  border-color: var(--error);
}
</style>