<script setup>
import { defineProps } from 'vue'
import { store } from '../stores/datos.js'

defineProps(['book'])

const getModuleLiteral = (code) => {
    const m = store.getModuleByCode(code)
    return m ? m.cliteral : code
}

const resolveImage = (book) => {
    return book.photo;
}
</script>

<template>
    <div class="book-card">
        <div class="image-wrapper">
             <img 
                :src="`/img/${resolveImage(book)}`" 
                :alt="book.title" 
                @error="$event.target.src='/logoBatoi.png'"
            />
        </div>

        <div class="info">
            <span class="badge">{{ getModuleLiteral(book.moduleCode) }}</span>
            
            <h3>{{ book.title || 'Libro #' + book.id }}</h3>
            
            <div class="details">
                <p><strong>Editorial:</strong> {{ book.publisher }}</p>
                <p><strong>Páginas:</strong> {{ book.pages }} | <strong>Estado:</strong> {{ book.status }}</p>
                <p v-if="book.comments" class="comments">"{{ book.comments }}"</p>
            </div>

            <div class="price">{{ book.price }} €</div>
        </div>
        
        <slot></slot>
    </div>
</template>

<style scoped>
.book-card {
  background: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  transition: transform 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.image-wrapper {
  height: 200px;
  background-color: var(--border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-bottom: 1px solid var(--border);
}

.image-wrapper img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
}

.info {
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.badge {
  background-color: #dbeafe;
  color: var(--primary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  align-self: flex-start;
  margin-bottom: 10px;
}

h3 {
  margin: 0 0 10px 0;
  font-size: 1.25rem;
  color: var(--text);
  line-height: 1.4;
}

.details p {
  margin: 4px 0;
  font-size: 0.95rem;
  color: var(--text-muted);
}

.comments {
  font-style: italic;
  color: var(--text-light);
  margin-top: 8px;
  font-size: 0.9rem;
}

.price {
  margin-top: auto;
  padding-top: 15px;
  text-align: right;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text);
}
</style>