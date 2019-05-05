import lorem from "./lorem.json";

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
});

/*
    Move this code to a file called type.js
    To do this we need to start using webpack since ES6 modules is not supported
*/

const writeChar = (element, char) => {
    element.dispatchEvent(
        new KeyboardEvent("keydown", {
            key: char.charCodeAt(0),
            char,
            shiftKey: true,
            bubbles: true
        })
    );
    element.dispatchEvent(
        new KeyboardEvent("keypress", {
            key: char.charCodeAt(0),
            char,
            shiftKey: true,
            bubbles: true
        })
    );

    document.execCommand("insertText", true, char);

    element.dispatchEvent(
        new KeyboardEvent("keyup", {
            key: char.charCodeAt(0),
            char,
            shiftKey: true,
            bubbles: true
        })
    );
};

const writeOnElement = (element, state) => {
    // Assuming words are 5 char in average
    const cpm = state.wpm * 5;
    const timeToWrite = 60 / cpm;

    let index = 0;
    interval = setInterval(() => {
        writeChar(element, lorem.text[index]);
        ++index;

        if (index >= lorem.length) {
            clearInterval(interval);
        }
    }, timeToWrite * 1000);
};
