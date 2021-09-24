let expanded = false;

export const showCheckboxes = () => {
    const checkboxes = document.getElementById("genres");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    };
};