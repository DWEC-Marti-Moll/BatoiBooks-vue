<script setup>
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BookList from './views/BookList.vue'
import BookForm from './views/BookForm.vue'
import AppAbout from './views/AppAbout.vue'
</script>

<template>
  <AppMenu></AppMenu>
  <AppMessages></AppMessages>
  <BookList></BookList>
  <BookForm></BookForm>
  <AppAbout></AppAbout>
</template>

<style scoped></style>
