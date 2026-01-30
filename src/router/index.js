import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../views/BooksListView.vue'
import BookForm from '../views/BookFormView.vue'
import BookCart from '../views/CartView.vue'

const routes = [
  {
    path: '/',
    name: 'BooksList',
    component: BooksList,
  },
  {
    path: '/books',
    name: 'Books',
    component: BooksList,
  },
  {
    path: '/add-book',
    name: 'AddBook',
    component: BookForm,
  },
  {
    path: '/edit-book/:id',
    name: 'EditBook',
    component: BookForm,
    props: true,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: BookCart,
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
