// view.js
//

// Imports
//
import { defineStore } from 'pinia'
import { defaults } from 'services/defaults'

//
//
function calcViewBox(state) {

    let w = state.width / state.zoomFactor
    let h = state.height / state.zoomFactor

    let x = (-w / 2) + state.scrollX
    let y = (-h / 2) + state.scrollY

    return [x, y, w, h]
}

// Store 'view'
//
export const useViewStore = defineStore('viewBoxStore', {
    //
    // State
    //
    state: () => ({
        scrollX: 0,
        scrollY: 0,
        //
        zoomFactor: 1,
        //
        width: defaults.viewBox.width,
        height: defaults.viewBox.height,
    }),
    getters: {
        // TODO: ReFactor or ReThink !!
        viewBox: (state) => {
            return calcViewBox(state)
        }
    }
})

