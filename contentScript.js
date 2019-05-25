let clickedElement;
let interval;

document.addEventListener(
    "mousedown",
    event => {
        // only handle right click
        if (event.button !== 2) {
            return false;
        }

        if (event.target === clickedElement && interval) {
            chrome.extension.sendMessage({
                command: 'updateContextMenu',
                isTyping: true
            });
        } else {
            chrome.extension.sendMessage({
                command: 'updateContextMenu',
                isTyping: false
            });
        }

        if (clickedElement !== event.target) {
            clickedElement = event.target;
            const onBlur = () => {
                clearInterval(interval);
                interval = null;
                if (clickedElement) {
                    clickedElement.removeEventListener("blur", onBlur);
                    clickedElement = null;
                }
            };
            clickedElement.addEventListener("blur", onBlur);
        }
    },
    true
);

document.addEventListener(
    "keydown",
    event => {
        // stop script on escape
        if (event.key === 'Escape' || event.keyCode === 27) {
            clearInterval(interval);
        }
    },
    true
);

chrome.runtime.onMessage.addListener(request => {
    if (request.command === "contextMenuClicked") {
        if (request.isTyping) {
            // stop typing
            clearInterval(interval);
            interval = null;
        } else {
            writeOnElement(clickedElement, request.state);
        }
    }

    if (request.command === 'stateUpdate') {
        // Only update the wpm if the script is already typing
        if (interval) {
            writeOnElement(clickedElement, request.state);
        }
    }
});
