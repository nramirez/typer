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

// Globally keep track of the paragraph index
let contentIndex = 0;

const writeOnElement = (element, state) => {
    // Assuming words are 5 char in average
    const cpm = state.wpm * 5;

    if (cpm < 1) {
        // We don't type if the user sets the typing to 0 or a negative number
        clearInterval(interval);
        return;
    }

    const timeToWrite = 60 / cpm;

    if (interval) {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        writeChar(element, lorem.text[contentIndex]);
        ++contentIndex;

        if (contentIndex >= lorem.length) {
            // loop through the same text
            contentIndex = 0;
        }
    }, timeToWrite * 1000);
};
