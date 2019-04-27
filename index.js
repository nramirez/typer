// https://developer.mozilla.org/en-US/docs/Web/API/Document/keypress_event
document.addEventListener('keypress', function (event) {
    console.log('keypress', event);
});

document.addEventListener('keydown', function (event) {
    console.log('keydown', event);
});

document.addEventListener('keyup', function (event) {
    console.log('keyup', event);
});