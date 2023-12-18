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
    actions: {
        getParent(child) {
            return this.parentFromChildId_[child.id]
        },
        setParent(parent, child) {
            this.parentFromChildId_[child.id] = parent
        },
        getElementById(id) {
            return this.elementsById_[id]
        }
    }
})