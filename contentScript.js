let clickedElement;
let interval;

document.addEventListener('mousedown', event =>{
    //right click
    if(event.button == 2) {
        clickedElement = event.target;
        const onBlur = () => {
            clearInterval(interval);
            clickedElement.removeEventListener('blur', onBlur);
            clickedElement = null;
        }
        clickedElement.addEventListener('blur', onBlur);
    }
}, true);

chrome.runtime.onMessage.addListener(request => {
    if (request === 'contextMenuClicked') {
        writeOnElement(clickedElement)
    }
});

/*
    Move this code to a file called type.js
    To do this we need to start using webpack since ES6 modules is not supported
*/

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Faucibus in ornare quam viverra orci sagittis. Nullam vehicula ipsum a arcu cursus vitae congue. Amet nisl suscipit adipiscing bibendum est. Malesuada fames ac turpis egestas maecenas pharetra convallis posuere. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium. Pellentesque habitant morbi tristique senectus. Quisque egestas diam in arcu cursus euismod quis viverra. Adipiscing elit pellentesque habitant morbi tristique. Sed cras ornare arcu dui. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices. Aenean euismod elementum nisi quis eleifend quam. Sapien nec sagittis aliquam malesuada bibendum arcu. Sem fringilla ut morbi tincidunt augue interdum. Felis eget nunc lobortis mattis aliquam faucibus purus in. Quam quisque id diam vel quam. Arcu non odio euismod lacinia at quis risus sed vulputate. Libero volutpat sed cras ornare arcu dui vivamus arcu. At urna condimentum mattis pellentesque. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim.

Aliquam nulla facilisi cras fermentum. Integer eget aliquet nibh praesent tristique magna sit amet. Libero volutpat sed cras ornare arcu dui vivamus arcu. Amet nisl suscipit adipiscing bibendum. Vel pharetra vel turpis nunc eget lorem dolor sed. Amet est placerat in egestas erat imperdiet sed euismod. Purus gravida quis blandit turpis cursus in hac habitasse. Habitasse platea dictumst quisque sagittis purus sit amet volutpat. Amet mattis vulputate enim nulla aliquet porttitor. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Faucibus scelerisque eleifend donec pretium vulputate. Orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt. Sit amet consectetur adipiscing elit. Eu scelerisque felis imperdiet proin fermentum leo. Non enim praesent elementum facilisis leo vel fringilla est. Nisi lacus sed viverra tellus in hac habitasse. Massa tempor nec feugiat nisl. Ut porttitor leo a diam sollicitudin tempor.

Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Eu turpis egestas pretium aenean pharetra magna ac placerat. Euismod in pellentesque massa placerat. Urna porttitor rhoncus dolor purus non enim praesent elementum. Eu feugiat pretium nibh ipsum consequat. Eget velit aliquet sagittis id consectetur purus. Nibh sed pulvinar proin gravida. Orci sagittis eu volutpat odio facilisis mauris sit amet. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Viverra adipiscing at in tellus. Mi eget mauris pharetra et ultrices neque ornare aenean. Lectus nulla at volutpat diam ut venenatis tellus in metus. Adipiscing commodo elit at imperdiet dui accumsan sit amet nulla. Eu nisl nunc mi ipsum faucibus vitae.

Et ultrices neque ornare aenean euismod elementum. In mollis nunc sed id semper. Molestie at elementum eu facilisis sed. Tellus orci ac auctor augue mauris augue neque. Auctor urna nunc id cursus metus aliquam eleifend. Sed turpis tincidunt id aliquet risus feugiat in. Commodo quis imperdiet massa tincidunt nunc pulvinar. Cursus vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Volutpat est velit egestas dui id ornare arcu. Habitant morbi tristique senectus et netus et. Nulla facilisi morbi tempus iaculis. Tempus egestas sed sed risus pretium quam vulputate. Gravida rutrum quisque non tellus. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend.`


const wpm = 60;
// One word = 5 characters
const withTab = false;
const tabRatio = 0;
const cpm = wpm * 5;
const timeToWrite = 60 / cpm;
const text = lorem.replace(/\\n/, '');

const writeChar = (element, char) => {
    element.dispatchEvent(new KeyboardEvent('keydown', { key: char.charCodeAt(0), char, shiftKey: true, bubbles: true }));
    element.dispatchEvent(new KeyboardEvent('keypress', { key: char.charCodeAt(0), char, shiftKey: true, bubbles: true }));
    
    document.execCommand('insertText', true, char);
    
    element.dispatchEvent(new KeyboardEvent('keyup', { key: char.charCodeAt(0), char, shiftKey: true, bubbles: true }));    
}

const writeOnElement = (element) => {
    let index = 0;
    interval = setInterval(() => {
        writeChar(element, text[index]);
        ++index;

        if (index >= lorem.length) {
            clearInterval(interval);
        }
        
    }, timeToWrite * 1000);
}