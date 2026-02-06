<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '../stores/books.js'
import { useModulesStore } from '../stores/modules.js'
import { useMessagesStore } from '../stores/messages.js'
import { useForm, useField } from 'vee-validate'
import { bookSchema } from '../utils/validationSchema.js'

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()
const modulesStore = useModulesStore()
const messagesStore = useMessagesStore()

const isEditing = ref(false)
const bookId = ref(null)
const isLoading = ref(false)
const title = ref('Añadir Nuevo Libro')
const buttonText = ref('Guardar Libro')

// Validació amb VeeValidate
const { handleSubmit, resetForm: resetValidation, setValues, values } = useForm({
  validationSchema: bookSchema,
  initialValues: {
    moduleCode: '',
    publisher: '',
    price: '',
    pages: '',
    status: 'good',
    comments: ''
  }
})

// Camps del formulari amb validació
const { value: moduleCode, errorMessage: moduleCodeError } = useField('moduleCode')
const { value: publisher, errorMessage: publisherError } = useField('publisher')
const { value: price, errorMessage: priceError } = useField('price')
const { value: pages, errorMessage: pagesError } = useField('pages')
const { value: status, errorMessage: statusError } = useField('status')
const { value: comments } = useField('comments')

// Computed per detectar llibre duplicat
const isDuplicateBook = computed(() => {
  if (!isEditing.value && moduleCode.value && publisher.value) {
    return booksStore.books.some(book => 
      book.moduleCode === moduleCode.value && 
      book.publisher.toLowerCase() === publisher.value.toLowerCase() &&
      String(book.id) !== String(bookId.value)
    )
  }
  return false
})

// Reset formulari
const resetAll = () => {
  setValues({
    moduleCode: '',
    publisher: '',
    price: '',
    pages: '',
    status: 'good',
    comments: ''
  })
}

// Carregar llibre per editar
const loadBook = async (id) => {
  isLoading.value = true
  try {
    if (booksStore.books.length === 0) {
      await booksStore.fetchBooks()
    }
    
    const bookData = booksStore.getBookById(id)
    if (bookData) {
      // Omplir el formulari amb les dades existents
      setValues({
        moduleCode: bookData.moduleCode || '',
        publisher: bookData.publisher || '',
        price: bookData.price || '',
        pages: bookData.pages || '',
        status: bookData.status || 'good',
        comments: bookData.comments || ''
      })
      bookId.value = id
    } else {
      messagesStore.error('Libro no encontrado')
      router.push('/books')
    }
  } catch (error) {
    messagesStore.error('Error al cargar el libro: ' + error.message)
    router.push('/books')
  } finally {
    isLoading.value = false
  }
}

// Processar formulari (amb validació)
const onSubmit = handleSubmit(async (formValues) => {
  try {
    // Validar que no és duplicat (només en creació)
    if (!isEditing.value && isDuplicateBook.value) {
      messagesStore.error('Ya existe un libro con este módulo y editorial')
      return
    }
    
    if (isEditing.value) {
      await booksStore.updateBook(bookId.value, formValues)
      messagesStore.success('Libro actualizado correctamente')
    } else {
      await booksStore.addBook(formValues)
      messagesStore.success('Libro añadido correctamente')
    }
    router.push('/books')
  } catch (error) {
    messagesStore.error(error.message)
  }
})

// Inicialitzar formulari segons la ruta
const initializeForm = async () => {
  if (route.name === 'EditBook' && route.params.id) {
    isEditing.value = true
    bookId.value = route.params.id
    title.value = 'Editar Libro'
    buttonText.value = 'Actualizar Libro'
    await loadBook(bookId.value)
  } else if (route.name === 'AddBook') {
    isEditing.value = false
    bookId.value = null
    title.value = 'Añadir Nuevo Libro'
    buttonText.value = 'Guardar Libro'
    resetAll()
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
      <form @submit.prevent="onSubmit">
        <div class="grid-form">
          <div class="form-group full-width">
            <label>Módulo <span class="required">*</span></label>
            <select v-model="moduleCode">
              <option value="" disabled>- Seleccionar -</option>
              <option v-for="mod in modulesStore.modules" :key="mod.code" :value="mod.code">
                {{ mod.cliteral }}
              </option>
            </select>
            <span v-if="moduleCodeError" class="error-message">{{ moduleCodeError }}</span>
          </div>
          
          <div class="form-group full-width">
            <label>Editorial <span class="required">*</span></label>
            <input 
              type="text" 
              v-model="publisher" 
              placeholder="Ej: McGraw Hill"
            />
            <span v-if="publisherError" class="error-message">{{ publisherError }}</span>
            <span v-if="isDuplicateBook" class="error-message duplicate-warning">
              Ya existe un libro con este módulo y editorial
            </span>
          </div>

          <div class="form-group">
            <label>Precio (€) <span class="required">*</span></label>
            <input 
              type="number" 
              step="0.01" 
              v-model="price" 
            />
            <span v-if="priceError" class="error-message">{{ priceError }}</span>
          </div>

          <div class="form-group">
            <label>Páginas <span class="required">*</span></label>
            <input 
              type="number" 
              v-model="pages" 
            />
            <span v-if="pagesError" class="error-message">{{ pagesError }}</span>
          </div>

          <div class="form-group full-width">
            <label>Estado <span class="required">*</span></label>
            <div class="radios">
              <label class="radio-label">
                <input type="radio" value="good" v-model="status"> Bueno
              </label>
              <label class="radio-label">
                <input type="radio" value="new" v-model="status"> Nuevo
              </label>
              <label class="radio-label">
                <input type="radio" value="bad" v-model="status"> Malo
              </label>
            </div>
            <span v-if="statusError" class="error-message">{{ statusError }}</span>
          </div>

          <div class="form-group full-width">
            <label>Comentarios</label>
            <textarea v-model="comments" rows="3" placeholder="Opcional..."></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-submit">{{ buttonText }}</button>
          <button type="button" @click="resetAll" class="btn-reset">
            {{ isEditing ? 'Recargar' : 'Limpiar' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
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

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 4px;
  font-weight: 500;
}

.duplicate-warning {
  color: #f59e0b;
}

.required {
  color: var(--primary);
  margin-left: 4px;
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

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 1.5rem;
}

.btn-submit {
  flex: 1;
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

.btn-reset {
  flex: 1;
  background: var(--border-light);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 12px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius);
  cursor: pointer;
  transition: background 0.2s;
}

.btn-reset:hover {
  background: var(--border);
}
</style>