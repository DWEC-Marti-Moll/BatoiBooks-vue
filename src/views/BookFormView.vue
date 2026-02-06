<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books.js'
import { useModulesStore } from '../stores/modules.js'
import { useMessagesStore } from '../stores/messages.js'

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()
const modulesStore = useModulesStore()
const messagesStore = useMessagesStore()

const isEditing = ref(false)
const bookId = ref(null)
const book = ref({
  moduleCode: '', 
  publisher: '', 
  price: 0, 
  pages: 0, 
  status: 'good', 
  comments: ''
})

const title = ref('Añadir Nuevo Libro')
const buttonText = ref('Guardar Libro')
const isLoading = ref(false)

// Reset formulari
const resetForm = () => {
  book.value = { 
    moduleCode: '', 
    publisher: '', 
    price: 0, 
    pages: 0, 
    status: 'good', 
    comments: '' 
  }
}

// Carregar llibre per editar (amb validació millorada)
const loadBook = async (id) => {
  isLoading.value = true
  try {
    // Assegurar-se que els llibres estan carregats
    if (booksStore.books.length === 0) {
      await booksStore.fetchBooks()
    }
    
    // Buscar el llibre (convertir a string per evitar problemes de tipus)
    const bookData = booksStore.getBookById(id)
    
    if (bookData) {
      book.value = { ...bookData }
      console.log('Llibre carregat:', bookData)
    } else {
      console.error('Llibre no trobat amb ID:', id)
      console.log('Llibres disponibles:', booksStore.books.map(b => ({ id: b.id, title: b.title })))
      messagesStore.error('Libro no encontrado')
      router.push('/books')
    }
  } catch (error) {
    console.error('Error al carregar el llibre:', error)
    messagesStore.error('Error al cargar el libro: ' + error.message)
    router.push('/books')
  } finally {
    isLoading.value = false
  }
}

// Processar formulari
const procesar = async () => {
  try {
    if (isEditing.value) {
      await booksStore.updateBook(bookId.value, book.value)
      messagesStore.success('Libro actualizado correctamente')
    } else {
      await booksStore.addBook({ ...book.value })
      messagesStore.success('Libro añadido correctamente')
    }
    router.push('/books')
  } catch (error) {
    messagesStore.error(error.message)
  }
}

// Inicialitzar formulari segons la ruta
const initializeForm = async () => {
  if (route.name === 'EditBook' && route.params.id) {
    isEditing.value = true
    bookId.value = route.params.id // Mantenir com a string
    title.value = 'Editar Libro'
    buttonText.value = 'Actualizar Libro'
    await loadBook(bookId.value)
  } else if (route.name === 'AddBook') {
    isEditing.value = false
    bookId.value = null
    title.value = 'Añadir Nuevo Libro'
    buttonText.value = 'Guardar Libro'
    resetForm()
  }
}

// Watcher per canvis de ruta
watch(
  () => route.name,
  async (newRouteName) => {
    await initializeForm()
  }
)

// Inicialitzar al muntar el component
onMounted(() => {
  initializeForm()
})
</script>

<template>
  <div class="form-view">
    <div v-if="isLoading" class="loading">
      Cargando...
    </div>
    <div v-else class="form-container">
      <h3>{{ title }}</h3>
      <form @submit.prevent="procesar">
        <div class="grid-form">
          <div class="form-group full-width">
            <label>Módulo</label>
            <select v-model="book.moduleCode" required>
              <option value="" disabled>- Seleccionar -</option>
              <option v-for="mod in modulesStore.modules" :key="mod.code" :value="mod.code">
                {{ mod.cliteral }}
              </option>
            </select>
          </div>
          
          <div class="form-group full-width">
            <label>Editorial</label>
            <input type="text" v-model="book.publisher" required placeholder="Ej: McGraw Hill"/>
          </div>

          <div class="form-group">
            <label>Precio (€)</label>
            <input type="number" step="0.01" v-model="book.price" required min="0"/>
          </div>

          <div class="form-group">
            <label>Páginas</label>
            <input type="number" v-model="book.pages" required min="1"/>
          </div>

          <div class="form-group full-width">
            <label>Estado</label>
            <div class="radios">
              <label class="radio-label">
                <input type="radio" value="good" v-model="book.status"> Bueno
              </label>
              <label class="radio-label">
                <input type="radio" value="new" v-model="book.status"> Nuevo
              </label>
              <label class="radio-label">
                <input type="radio" value="bad" v-model="book.status"> Malo
              </label>
            </div>
          </div>

          <div class="form-group full-width">
            <label>Comentarios</label>
            <textarea v-model="book.comments" rows="3" placeholder="Opcional..."></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">{{ buttonText }}</button>
          <button type="button" @click="resetForm" class="btn-reset">
            {{ isEditing ? 'Recargar' : 'Limpiar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Estils sense canvis */
.form-container {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  border-top: 4px solid var(--primary);
}

h3 { 
  margin-top: 0; 
  margin-bottom: 1.5rem; 
  color: var(--text); 
  font-weight: 600;
}

.grid-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.full-width { 
  grid-column: 1 / -1; 
}

.form-group label {
  display: block; 
  margin-bottom: 6px; 
  font-weight: 600; 
  font-size: 0.95rem; 
  color: var(--text);
}

.radios { 
  display: flex; 
  gap: 20px; 
  padding: 5px 0; 
}

.radio-label { 
  display: flex; 
  align-items: center; 
  gap: 6px; 
  cursor: pointer; 
  font-weight: 400; 
  color: var(--secondary);
}

.btn-submit {
  margin-top: 1.5rem;
  width: 100%; 
  background: var(--primary); 
  color: white; 
  border: none; 
  padding: 12px; 
  font-size: 1rem; 
  font-weight: 600; 
  border-radius: var(--radius); 
  cursor: pointer; 
  transition: background 0.2s;
}

.btn-submit:hover { 
  background: var(--primary-dark); 
}
</style>