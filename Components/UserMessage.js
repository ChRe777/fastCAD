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
<div class="toast-container p-3 top-50 start-50 translate-middle">
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