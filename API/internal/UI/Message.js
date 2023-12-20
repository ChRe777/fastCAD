// Message.js

// Imports
//
import { useMessageStore } from 'stores/message'

// Functions
//
function create(text) {
    const messageStore = useMessageStore()
    messageStore.messages.push(text)
}

// Export
//

export default {
    create
}