import { defineStore } from 'pinia'
import * as api from '../services/api.js'

export const useBooksStore = defineStore('books', {
  state: () => ({
    books: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalBooks: (state) => state.books.length,

    totalAmount: (state) => {
      return state.books.reduce((acc, book) => acc + Number(book.price), 0).toFixed(2)
    },

    getBookById: (state) => (id) => {
      // Comparar com a strings per evitar problemes de tipus
      const idString = String(id)
      return state.books.find((book) => String(book.id) === idString)
    },
  },

  actions: {
    async fetchBooks() {
      this.loading = true
      this.error = null
      try {
        this.books = await api.getDBBooks()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async addBook(bookData) {
      try {
        if (!bookData.photo) {
          bookData.photo = this.getModuleImage(bookData.moduleCode)
        }
        await api.addDBBook(bookData)
        await this.fetchBooks()
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async updateBook(id, bookData) {
      try {
        await api.changeDBBook({ id, ...bookData })
        await this.fetchBooks()
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    async deleteBook(id) {
      try {
        await api.removeDBBook(id)
        await this.fetchBooks()
      } catch (error) {
        this.error = error.message
        throw error
      }
    },

    getModuleImage(moduleCode) {
      const map = {
        '0021': '9788448635015.jpg',
        '0374': '9788448626648.jpg',
        '0375': '9788448626655.jpg',
        '0376': '9788448626662.jpg',
        '0378': '9788448626686.jpg',
        '0612': '9788448632663.jpg',
        1371: '9788448638719_1.jpg',
        1349: '9788448638900.jpg',
        1353: '9788448638986.jpg',
      }
      return map[moduleCode] || 'logoBatoi.png'
    },
  },
})
