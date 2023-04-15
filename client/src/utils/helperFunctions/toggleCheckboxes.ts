/**
 * show the dropdown menu containing checkboxes
 */

export const showCheckboxes = (): void => {
    const checkboxes = document.getElementById('genres')
    if (checkboxes) {
        (checkboxes as HTMLElement).style.display = 'block'
    }
}

/**
 * hide the dropdown menu containing checkboxes
 */

export const hideCheckboxes = (): void => {
    const checkboxes = document.getElementById('genres')
    const labels = document.getElementsByClassName('genre-label')
    let isActive = false
    if (labels) {
        for (let i = 0; i < (labels as HTMLCollectionOf<Element>).length; i++) {
            if (labels[i].matches(':hover')) {
                isActive = true
            }
        }
    }
    if (!isActive && checkboxes) {
        (checkboxes as HTMLElement).style.display = 'none'
    }
}
