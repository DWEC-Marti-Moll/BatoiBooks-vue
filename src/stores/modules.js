import { defineStore } from 'pinia'
import * as api from '../services/api.js'

export const useModulesStore = defineStore('modules', {
  state: () => ({
    modules: [],
    loading: false,
    error: null,
  }),

  getters: {
    getModuleByCode: (state) => (code) => {
      return state.modules.find((module) => module.code === code) || null
    },

    getModuleLiteral: (state) => (code) => {
      const module = state.modules.find((m) => m.code === code)
      return module ? module.cliteral : code
    },
  },

  actions: {
    async fetchModules() {
      this.loading = true
      this.error = null
      try {
        this.modules = await api.getDBModules()
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
