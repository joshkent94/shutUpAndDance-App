export const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    const headings = document.getElementsByClassName('nav-heading');
    const icons = document.getElementsByClassName('nav-icon');
    const toggleButton = document.getElementById('toggle-button');
    
    sidebar.classList.toggle('active');
    toggleButton.classList.toggle('rotate');

    if (headings[0].classList.contains('hide')) {
        setTimeout(() => {
            for (let i = 0; i < headings.length; i++) {
                headings[i].classList.toggle('hide');
            };
            
            for (let i = 0; i < icons.length; i++) {
                icons[i].classList.toggle('hide');
            };
        }, 400);
    } else {
        for (let i = 0; i < headings.length; i++) {
            headings[i].classList.toggle('hide');
        };
        
        for (let i = 0; i < icons.length; i++) {
            icons[i].classList.toggle('hide');
        };
    };
};