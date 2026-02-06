<script setup>
import { useMessagesStore } from '../stores/messages.js'

const messagesStore = useMessagesStore()
</script>

<template>
  <div class="messages-container">
    <transition-group name="fade">
      <div 
        v-for="msg in messagesStore.allMessages" 
        :key="msg.id" 
        class="message-card"
        :class="msg.type" 
      >
        <span class="text">{{ msg.text }}</span>
        <button @click="messagesStore.removeMessage(msg.id)" class="close-btn">×</button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.messages-container {
  position: fixed; 
  bottom: 30px; 
  right: 30px; 
  z-index: 2000;
  display: flex; 
  flex-direction: column; 
  gap: 12px;
}

.message-card {
  padding: 14px 20px; 
  border-radius: var(--radius);
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  min-width: 300px; 
  box-shadow: var(--shadow-lg);
  font-weight: 500;
  color: white;
}

.message-card.success {
  background-color: var(--success);
  border-left: 4px solid #059669;
}

.message-card.error {
  background-color: var(--error);
  border-left: 4px solid #dc2626;
}

.close-btn { 
  background: none; 
  border: none; 
  color: rgba(255,255,255,0.9); 
  font-size: 1.3rem; 
  line-height: 1; 
  padding: 0; 
  margin-left: 12px; 
  cursor: pointer; 
}

.close-btn:hover { 
  color: white; 
}

.fade-enter-active, .fade-leave-active { 
  transition: opacity 0.3s, transform 0.25s; 
}

.fade-enter-from, .fade-leave-to { 
  opacity: 0; 
  transform: translateX(20px); 
}
</style>