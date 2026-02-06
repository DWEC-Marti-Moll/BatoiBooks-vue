import { defineStore } from 'pinia'

export const useMessagesStore = defineStore('messages', {
  state: () => ({
    messages: [],
  }),

  getters: {
    allMessages: (state) => state.messages,
  },

  actions: {
    addMessage(text, type = 'success') {
      const msgObj = { id: Date.now(), text, type }
      this.messages.push(msgObj)

      setTimeout(() => {
        this.removeMessage(msgObj.id)
      }, 5000)
    },

    removeMessage(messageId) {
      this.messages = this.messages.filter((msg) => msg.id !== messageId)
    },

    success(text) {
      this.addMessage(text, 'success')
    },

    error(text) {
      this.addMessage(text, 'error')
    },
  },
})
