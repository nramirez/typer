const getState = async cb => {
    chrome.runtime.sendMessage({ command: "getState" }, r => cb(r.value));
};

const setState = async (state, cb) => {
    chrome.runtime.sendMessage({ command: "setState", value: state }, r =>
        cb(r.value)
    );
};

window.addEventListener("DOMContentLoaded", async _ => {
    const button = document.querySelector("footer button");
    const wpm = document.querySelector(".content input");

    const updateComponents = async state => {
        console.log("Updated State", state);
        button.innerText = state.isRunning ? "Stop!" : "Start!";
        wpm.value = state.wpm;
    };

    //Initial Load
    getState(state => {
        console.log("Initial State", state);
        updateComponents(state);

        button.addEventListener("click", async () => {
            await setState({ isRunning: !state.isRunning }, state =>
                updateComponents(state)
            );
        });

        wpm.addEventListener("change", e => {
            setState({ wpm: Number(e.target.value) }, newState => {
                updateComponents(newState);
            });
        });
    });
});
