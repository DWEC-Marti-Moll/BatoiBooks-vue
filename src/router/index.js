import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BookList.vue'),
    },
    {
      path: '/view-book/:bookId',
      name: 'view-book',
      component: () => import('../views/BookView.vue'),
    },
    {
      path: '/edit-book/:bookId',
      name: 'edit-book',
      component: () => import('../views/BookForm.vue'),
    },
    {
      path: '/add-book',
      name: 'add-book',
      component: () => import('../views/BookForm.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/BooksCart.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AppAbout.vue'),
    },
  ],
})

export default router
