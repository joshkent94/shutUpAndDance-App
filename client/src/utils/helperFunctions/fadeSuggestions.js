export const fadeSuggestions = () => {
    const suggestions = document.getElementsByClassName('track');
    for (let i = 0; i < suggestions.length; i++) {
        suggestions[i].classList.add("animate__fadeOut");
    };
};