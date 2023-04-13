export const showMessage = message => {
    const messageBox = document.createElement('div');
    messageBox.id = 'message';
    messageBox.classList.add("animate__animated");
    messageBox.classList.add("animate__fadeIn");
    const toDisplay = document.createTextNode(message);
    messageBox.appendChild(toDisplay);
    document.getElementById('root').appendChild(messageBox);
    setTimeout(() => {
        messageBox.classList.add("animate__fadeOut");
    }, 3000);
    setTimeout(() => {
        document.getElementById('root').removeChild(messageBox);
    }, 5000);
};

export const showInvertedMessage = message => {
    const messageBox = document.createElement('div');
    messageBox.id = 'message-inverted';
    messageBox.classList.add("animate__animated");
    messageBox.classList.add("animate__fadeIn");
    const toDisplay = document.createTextNode(message);
    messageBox.appendChild(toDisplay);
    document.getElementById('root').appendChild(messageBox);
    setTimeout(() => {
        messageBox.classList.add("animate__fadeOut");
    }, 3000);
    setTimeout(() => {
        document.getElementById('root').removeChild(messageBox);
    }, 5000);
};