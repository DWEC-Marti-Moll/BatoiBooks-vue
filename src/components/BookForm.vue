<script setup>
import { ref } from 'vue'
import { store } from '../stores/datos.js'

const book = ref({
    moduleCode: '', publisher: '', price: 0, pages: 0, status: 'good', comments: ''
})

const procesar = async () => {
    await store.addBook({ ...book.value })
    book.value = { moduleCode: '', publisher: '', price: 0, pages: 0, status: 'good', comments: '' }
}
</script>

<template>
    <div class="form-container">
        <h3>Añadir Nuevo Libro</h3>
        <form @submit.prevent="procesar">
            <div class="grid-form">
                <div class="form-group full-width">
                    <label>Módulo</label>
                    <select v-model="book.moduleCode" required>
                        <option value="" disabled>- Seleccionar -</option>
                        <option v-for="mod in store.modules" :key="mod.code" :value="mod.code">{{ mod.cliteral }}</option>
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
                        <label class="radio-label"><input type="radio" value="good" v-model="book.status"> Bueno</label>
                        <label class="radio-label"><input type="radio" value="new" v-model="book.status"> Nuevo</label>
                        <label class="radio-label"><input type="radio" value="bad" v-model="book.status"> Malo</label>
                    </div>
                </div>

                <div class="form-group full-width">
                    <label>Comentarios</label>
                    <textarea v-model="book.comments" rows="3" placeholder="Opcional..."></textarea>
                </div>
            </div>

            <button type="submit" class="btn-submit">Guardar Libro</button>
        </form>
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