<script setup>
import { onMounted } from 'vue'
import { store } from './stores/datos.js'

import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BookForm from './components/BookForm.vue'
import BooksList from './components/BookList.vue'
import AppAbout from './components/AppAbout.vue'
import logo from '/logoBatoi.png' 

onMounted(() => {
    store.fetchBooks()
    store.fetchModules()
})
</script>

<template>
  <div id="app-wrapper">
    <header class="main-header">
       <div class="header-content">
          <div class="brand">
             <img :src="logo" alt="BatoiBooks" width="40"/>
             <h1>BatoiBooks</h1>
          </div>
          <AppMenu />
       </div>
    </header>
    
    <AppMessages />

    <div class="main-container">
        
        <main class="content-area">
            
            <section class="books-section">
                <BooksList />
            </section>
            
            <div class="totales-bar">
                <span>Total Libros: <strong>{{ store.totalLibros }}</strong></span>
                <span>Importe Total: <strong>{{ store.importeTotal }} €</strong></span>
            </div>

            <section class="form-section">
                <BookForm />
            </section>

        </main>
    </div>

    <footer>
        <AppAbout />
    </footer>
  </div>
</template>

<style scoped>
#app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 0 20px;
}

.main-header {
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 1rem 0;
  box-shadow: var(--shadow);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text);
  margin: 0;
}

.main-container {
  margin: 2rem 0;
  flex: 1;
}

.content-area {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.totales-bar {
  background-color: white;
  color: var(--text);
  padding: 1rem 1.5rem;
  text-align: right;
  font-size: 1.1rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  border: 1px solid var(--border);
}
</style>