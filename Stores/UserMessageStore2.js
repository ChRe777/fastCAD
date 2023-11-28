// message.js
//

// Imports
//
import { defineStore } from 'pinia'

// Store editor stuff
//
export const useMessageStore = defineStore('UserMessageStore', {
    //
    // State
    //
    state: () => ({
        messages: [],
    }),
})