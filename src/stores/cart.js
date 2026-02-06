import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('batoiBooksCart')) || [],
  }),

  getters: {
    cartItems: (state) => state.items,

    cartCount: (state) => state.items.length,

    cartTotal: (state) => {
      return state.items.reduce((acc, item) => acc + Number(item.price), 0)
    },

    isInCart: (state) => (bookId) => {
      return state.items.some((item) => item.id === bookId)
    },
  },

  actions: {
    addToCart(book) {
      if (!this.isInCart(book.id)) {
        this.items.push({ ...book })
        this.saveToLocalStorage()
      }
    },

    removeFromCart(bookId) {
      this.items = this.items.filter((item) => item.id !== bookId)
      this.saveToLocalStorage()
    },

    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('batoiBooksCart', JSON.stringify(this.items))
    },
  },
})
