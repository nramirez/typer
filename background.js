chrome.contextMenus.create({
    id: "typer",
    title: "Start typing here!",
    contexts: ["editable"]
});

chrome.contextMenus.onClicked.addListener((_, tab) => {
    chrome.tabs.sendMessage(tab.id, {
        command: "contextMenuClicked",
        state: getState()
    });
});

chrome.runtime.onMessage.addListener(function(request, _, sendResponse) {
    let res = null;
    switch (request.command) {
        case "getState": {
            res = { value: getState() };
            break;
        }
        case "setState": {
            setState(request.value);
            res = { value: getState() };
            break;
        }
    }

    if (res) {
        sendResponse(res);
    }
});

const initialState = {
    wpm: 60
};

const getState = () => {
    const state = localStorage.getItem("typer-state");
    return state && state !== "undefined" ? JSON.parse(state) : initialState;
};

const setState = newState => {
    const state = getState();
    localStorage.setItem(
        "typer-state",
        JSON.stringify({ ...state, ...newState })
    );
};
