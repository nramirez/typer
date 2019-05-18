let clickedElement;
let interval;

document.addEventListener(
    "mousedown",
    event => {
        // right click
        if (event.button == 2) {
            clickedElement = event.target;
            const onBlur = () => {
                clearInterval(interval);
                clickedElement.removeEventListener("blur", onBlur);
                clickedElement = null;
            };
            clickedElement.addEventListener("blur", onBlur);
        }
    },
    true
);

chrome.runtime.onMessage.addListener(request => {
    if (request.command === "contextMenuClicked") {
        writeOnElement(clickedElement, request.state);
    }

    if (request.command === 'stateUpdate') {
        // Only update the wpm if the script is already typing
        if (interval) {
            writeOnElement(clickedElement, request.state);
        }
    }
});
