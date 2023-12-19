// CacheStore.js
//

// TODO: 
//  - Update cache if elements are added or removed
//  - Update cache if parent child relationsship changed

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
        parentByChildId_: {},
        elementsById_: {}
    }),
    //
    // Actions
    //
    actions: {
        clear() {
            // New reference - FAST - GC
            this.parentByChildId_ = {}
            this.elementsById_ = {}

            // Keep reference - SLOWER
            // Object.keys(this.parentByChildId_).forEach(key => delete this.parentByChildId_[key])
            // Object.keys(this.elementsById_).forEach(key => delete this.elementsById_[key])
        },
        //
        getParent(id) {
            return this.parentByChildId_[id]
        },
        setParent(parent, childId) {
            this.parentByChildId_[childId] = parent
        },
        //
        getElementById(id) {
            console.log("cacheStore - elementsById_", this.elementsById_)
            return this.elementsById_[id]
        },
        setElementById(element, id) {
            this.elementsById_[id] = element
        }
    }
})