// message.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const useMessageStore = defineStore('userMessageStore', {
    //
    // State
    //
    state: () => ({
        messages: [],
    }),
})