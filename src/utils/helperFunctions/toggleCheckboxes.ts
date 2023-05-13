/**
 * show the dropdown menu containing checkboxes
 */

export const showCheckboxes = (): void => {
    const checkboxes = document.getElementById('dropdown')
    if (checkboxes) {
        (checkboxes as HTMLElement).setAttribute( 'style', 'display: block !important' )
    }
}

/**
 * hide the dropdown menu containing checkboxes
 */

export const hideCheckboxes = (): void => {
    const checkboxes = document.getElementById('dropdown')
    const labels = document.getElementsByClassName('dropdown-option')
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
