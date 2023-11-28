// selection.js
//

// Function to check if two rectangles intersect
//
function intersect(elementRect, selectionRect) {
    return (
        elementRect.x < selectionRect.x + selectionRect.width &&
        elementRect.x + elementRect.width > selectionRect.x &&
        elementRect.y < selectionRect.y + selectionRect.height &&
        elementRect.y + elementRect.height > selectionRect.y
    )
}

// Function to check if the bounding box
//
function inside(elementRect, selectionRect) {
    return (
        elementRect.left >= selectionRect.left &&
        elementRect.right <= selectionRect.right &&
        elementRect.top >= selectionRect.top &&
        elementRect.bottom <= selectionRect.bottom
    )
}

let svgContainer = document.getElementById('svgContainer')
let isDragging = false
let startX, startY
let selectionRect
let originalColors = {}

svgContainer.addEventListener('mousedown', (event) => {
    if (event.shiftKey) {
        isDragging = true
        startX = event.clientX
        startY = event.clientY

        selectionRect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        selectionRect.setAttribute("stroke", "black")
        selectionRect.setAttribute("stroke-dasharray", "5")
        selectionRect.setAttribute("fill", "none")
        svgContainer.appendChild(selectionRect)

        // Store the original colors of selectable elements
        const selectableElements = document.querySelectorAll('.selectable')
        selectableElements.forEach((element) => {
            originalColors[element.id] = element.getAttribute('fill')
        })
    }
})

svgContainer.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const currentX = event.clientX
        const currentY = event.clientY

        const width = currentX - startX
        const height = currentY - startY

        let crossMode = width < 0 || height < 0

        selectionRect.setAttribute("x", Math.min(startX, currentX))
        selectionRect.setAttribute("y", Math.min(startY, currentY))
        selectionRect.setAttribute("width", Math.abs(width))
        selectionRect.setAttribute("height", Math.abs(height))

        // Perform selection logic here
        const selectableElements = document.querySelectorAll('.selectable')
        const selectionRect = selectionRect.getBoundingClientRect()

        selectableElements.forEach((element) => {
            const elementRect = element.getBoundingClientRect()

            let fn = inside
            if (crossMode) {
                fn = intersect
            }

            let res = fn(elementRect, selectionRect)
            if (res) {
                element.setAttribute('fill', 'yellow')
            } else {
                element.setAttribute('fill', originalColors[element.id])
            }
        })
    }
})

window.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false

        // Remove the selection rectangle from the SVG
        svgContainer.removeChild(selectionRect)

        // Reset the original colors of selectable elements
        const selectableElements = document.querySelectorAll('.selectable')
        selectableElements.forEach((element) => {
            element.setAttribute('fill', originalColors[element.id])
        });

        // Clear the original colors object
        originalColors = {}
    }
})
