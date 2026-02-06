<script setup>
import { useCartStore } from '../stores/cart.js'
import { useBooksStore } from '../stores/books.js'
import { useMessagesStore } from '../stores/messages.js'
import BookItem from '../components/BookItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const booksStore = useBooksStore()
const messagesStore = useMessagesStore()

const removeFromCart = (bookId) => {
  cartStore.removeFromCart(bookId)
  messagesStore.success('Libro eliminado del carrito')
}

const clearCart = () => {
  if (confirm('¿Está seguro de que quiere vaciar el carrito?')) {
    cartStore.clearCart()
    messagesStore.success('Carrito vaciado')
  }
}

const checkout = async () => {
  if (cartStore.cartCount === 0) {
    messagesStore.error('El carrito está vacío')
    return
  }

  const total = cartStore.cartTotal
  const firstDigit = parseInt(total.toString().charAt(0))

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        books: cartStore.cartItems,
        total: total
      })
    })

    if (firstDigit < 5) {
      messagesStore.error('❌ Transacción fallida: El primer dígito del importe es menor que 5')
    } else {
      messagesStore.success('✅ Compra realizada correctamente')
      cartStore.clearCart()
    }
  } catch (error) {
    messagesStore.error('Error al procesar la compra')
  }
}
</script>

<template>
  <div class="cart-view">
    <h2>Carrito de Compra</h2>
    
    <div v-if="cartStore.cartCount === 0" class="empty-cart">
      <p>El carrito está vacío</p>
      <router-link to="/books" class="btn-primary">Ver libros</router-link>
    </div>

    <div v-else>
      <div class="cart-books">
        <BookItem v-for="book in cartStore.cartItems" :key="book.id" :book="book">
          <div class="cart-actions">
            <button 
              class="btn-icon btn-remove" 
              @click="removeFromCart(book.id)" 
              title="Eliminar del carrito"
            >
              <span class="material-icons">remove_shopping_cart</span>
            </button>
          </div>
        </BookItem>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Total de libros:</span>
          <strong>{{ cartStore.cartCount }}</strong>
        </div>
        <div class="summary-row">
          <span>Importe total:</span>
          <strong>{{ cartStore.cartTotal.toFixed(2) }} €</strong>
        </div>
      </div>

      <div class="cart-buttons">
        <button @click="clearCart" class="btn-secondary">
          Vaciar carrito
        </button>
        <button @click="checkout" class="btn-primary">
          Realizar compra
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  color: var(--text);
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
}

/* Carrito buit */
.empty-cart {
  background: white;
  padding: 3rem 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;
}

.empty-cart p {
  color: var(--text-light);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-style: italic;
}

/* Llibres al carrito */
.cart-books {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 2rem;
}

/* Accions del carrito */
.cart-actions {
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: all 0.2s;
  font-size: 1.2rem;
}

.btn-icon:hover:not(:disabled) {
  background: #fee2e2;
  color: var(--error);
  border-color: var(--error);
  transform: scale(1.05);
}

.btn-remove {
  background: #fee2e2;
  color: var(--error);
  border-color: var(--error);
}

/* Resum del carrito */
.cart-summary {
  background: white;
  padding: 1.5rem 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  margin-bottom: 1.5rem;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  font-size: 1.1rem;
  color: var(--text);
  border-bottom: 1px solid var(--border-light);
}

.summary-row:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.summary-row strong {
  font-size: 1.4rem;
  color: var(--primary);
}

/* Botons del carrito */
.cart-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 2rem;
}

.btn-secondary,
.btn-primary {
  padding: 14px 32px;
  border: none;
  border-radius: var(--radius);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  background: var(--border-light);
  color: var(--text);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--border);
  color: var(--text-dark);
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Responsive */
@media (max-width: 768px) {
  .cart-books {
    grid-template-columns: 1fr;
  }

  .cart-buttons {
    flex-direction: column;
  }

  .btn-secondary,
  .btn-primary {
    width: 100%;
    justify-content: center;
  }

  .summary-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .summary-row strong {
    font-size: 1.2rem;
  }
}

/* Animacions */
.cart-books {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cart-books > * {
  animation: slideIn 0.4s ease-out forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cart-books > *:nth-child(1) { animation-delay: 0.1s; }
.cart-books > *:nth-child(2) { animation-delay: 0.15s; }
.cart-books > *:nth-child(3) { animation-delay: 0.2s; }
.cart-books > *:nth-child(4) { animation-delay: 0.25s; }
.cart-books > *:nth-child(5) { animation-delay: 0.3s; }
</style>