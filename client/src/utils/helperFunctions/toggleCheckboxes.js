let expanded = false;

export const showCheckboxes = () => {
    const checkboxes = document.getElementById("genres");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    };
};

export const hideCheckboxes = () => {
    const checkboxes = document.getElementById("genres");
    const labels = document.getElementsByClassName('genre-label');
    let isActive;
    for (let i = 0; i < labels.length; i++) {
        if (labels[i].matches(':hover')) {
            isActive = true;
        };
    };
    if (expanded & !isActive) {
        checkboxes.style.display = "none";
        expanded = false;
    };
};