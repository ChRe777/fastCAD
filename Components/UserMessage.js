// message.js

// Import
//

// TODO: API
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
            // TODO: API
            messagesStore: useMessageStore()
        }
    },
    template,
    computed: {
        messages() {
            // TODO: API
            return this.messagesStore.messages
        }
    },
    components: {
        Toast
    }
}