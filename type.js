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
