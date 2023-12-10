// SelectionUtils.js

// Function to check if the bounding box of an element is inside the selection rectangle
//
function inside(elementRect, selectionRect) {
    return (
        elementRect.left >= selectionRect.left &&
        elementRect.right <= selectionRect.right &&
        elementRect.top >= selectionRect.top &&
        elementRect.bottom <= selectionRect.bottom
    )
}

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

// Exports
//
export {
    inside,
    intersect
}