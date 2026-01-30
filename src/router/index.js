import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../views/BooksListView.vue'

const routes = [
  {
    path: '/',
    name: 'BooksList',
    component: () => import('../views/BooksListView.vue'),
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/BooksListView.vue'),
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: () => import('../views/BookFormView.vue'),
  },
  {
    path: '/edit-book/:id',
    name: 'EditBook',
    component: () => import('../views/BookFormView.vue'),
    props: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/CartView.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
