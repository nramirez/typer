chrome.contextMenus.create({
    'id': 'typer',
    'title': 'Start typing here',
    'contexts': ['editable'],
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.sendMessage(tab.id, "contextMenuClicked");
})
