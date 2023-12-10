// ToolService.js

// Imports
//
import { useToolStore } from 'stores/tool'

// Tools
//
import polylineTool from 'tools/polyline'
import selectionTool from 'tools/selection'
import panTool from 'tools/pan'
import zoomTool from 'tools/zoom'

// Register Tools in Init
// 
export function init() {

    const toolStore = useToolStore()

    toolStore.registerTool(polylineTool)
    toolStore.registerTool(selectionTool)
    toolStore.registerTool(panTool)
    toolStore.registerTool(zoomTool)
}
