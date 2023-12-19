// CacheStore.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const useCacheStore = defineStore('cacheStore', {
    //
    // State
    //
    state: () => ({
        parentFromChildId_: {},
        elementsById_: {}
    }),
    //
    // Actions
    //
    actions: {
        getParent(id) {
            return this.parentFromChildId_[id]
        },
        setParent(parent, childId) {
            this.parentFromChildId_[childId] = parent
        },
        getElementById(id) {
            return this.elementsById_[id]
        }
    }
})