// message.js

// Import
//

// Store
//
import { useMessageStore } from 'stores/message'

// Parts
//
import Toast from 'parts/toast'

// Template
//
const template = `
<div class="toast-container p-2 bottom-0 start-0">
    <toast v-for="(message, index) in messages" :text="message" :id="index" />
</div>
`

// Component
//
export default {
    data() {
        return {
            messagesStore: useMessageStore()
        }
    },
    template,
    computed: {
        messages() {
            return this.messagesStore.messages
        }
    },
    components: {
        Toast
    }
}