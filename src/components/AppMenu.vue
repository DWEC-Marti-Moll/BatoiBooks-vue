<template>
    <nav>
        <ul>
            <li><a href="#">Ver Libros</a></li>
            <li><a href="#">Añadir Libro</a></li>
            <li><a href="#">About</a></li>
        </ul>
    </nav>
</template>

<style scoped>
nav { 
  display: flex; 
  gap: 24px; 
}

a { 
  text-decoration: none; 
  color: var(--text-muted); 
  font-weight: 500; 
  font-size: 0.95rem; 
  transition: color 0.2s; 
}

a:hover, a.active { 
  color: var(--primary); 
}
</style>