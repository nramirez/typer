let isTyping = false;
chrome.contextMenus.create({
    id: "typerContextId",
    title: "Start typing here",
    contexts: ["editable"]
});

chrome.contextMenus.onClicked.addListener((_, tab) => {
    chrome.tabs.sendMessage(tab.id, {
        command: "contextMenuClicked",
        state: getState(),
        isTyping: isTyping
    });
});

const updateTabsState = (state) => {
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach(({ id }) => {
            chrome.tabs.sendMessage(id, {
                command: 'stateUpdate',
                state: state
            });
        });
    });
}

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
    let res = null;
    switch (request.command) {
        case "getState": {
            res = { value: getState() };
            break;
        }
        case "setState": {
            setState(request.value);
            res = { value: getState() };
            updateTabsState(res.value);
            break;
        }
        case "updateContextMenu": {
            isTyping = request.isTyping;
            chrome.contextMenus.update('typerContextId', {
                title: isTyping ? 'Stop typing' : 'Start typing here',
                contexts: ["editable"]
            });
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
