//Handle slider
let slider = document.getElementById("range");
let numbers = document.querySelectorAll(".number");
numbers.forEach(num => num.textContent = slider.value);
slider.oninput = function() {
    numbers.forEach(num => num.textContent = this.value);
    removeOldGrid();
    createGrid(this.value);
} 

let num = slider.value;
const wrapper = document.querySelector('.wrapper');

// Create drawboard
function createGrid(number) {
    for (let i = 0; i < number ; i++) {
        let row = grid('row');
        for (let j = 0; j < number; j++) {
            let col = grid('column');
            col.setAttribute("onmouseenter", "draw(this)");
            row.appendChild(col);
        }
        wrapper.appendChild(row);
    }
}

// Create rows and cols
function grid(role) {
    let div = document.createElement('div');
    div.classList.add(role);
    return div;
}

// Draw
function draw(e) {
    e.classList.remove('eraser', 'skyBlue');
    e.removeAttribute('style');
    e.classList.add('hover');
}

// Handle set size button
document.querySelector('.set').addEventListener('click', set);
function set() {
    num = window.prompt('Enter a number to create your drawboard:', 'Default: 16, Max: 100');
    // Check if a number is entered
    if (num) { // if user enters something
        while (!Number(num)) {
            num = window.prompt('Enter a number to create your drawboard:', 'Default: 16, Max: 100');
            // Check if user click cancel or escape
            if (!num) {
                num = 16;
                break;
            }
        }
    } 
    else { // Check if user click cancel or escape
        num = 16;
    }
    num = num > 100 ? 100 : num;
    numbers.forEach(numb =>  numb.textContent = num);
    slider.value = num;
    removeOldGrid();
    createGrid(num);
}

// Remove the old drawboard;
function removeOldGrid() {
    document.querySelectorAll('.row').forEach(row => {
        while (row.firstChild) {
            row.removeChild(row.firstChild)
        }
    })
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
    };
}

// Handle set color buttons
document.querySelector('.blue').addEventListener('click', blue);
function blue() {
    document.querySelectorAll('.column').forEach(col => col.setAttribute('onmouseenter', 'drawBlue(this)'));
}
function drawBlue(e) {
    e.classList.remove('hover', 'eraser');
    e.removeAttribute('style');
    e.classList.add('skyBlue');
}

document.querySelector('.random').addEventListener('click', random);
function random() {
    document.querySelectorAll('.column').forEach(col => col.setAttribute('onmouseenter', 'drawRandom(this)'));
}
function drawRandom(e) {
    e.classList.remove('hover', 'skyBlue', 'eraser');
    let r,g,b;
    r = Math.floor(Math.random() * 255);
    g = Math.floor(Math.random() * 255); 
    b = Math.floor(Math.random() * 255);
    e.setAttribute('style', `background-color: rgb(${r}, ${g}, ${b}) `);
}

// Handle clean div
document.querySelector('#clear').addEventListener('click', clear);
function clear() {
    document.querySelectorAll('.column').forEach(col => {
        col.classList.remove('hover', 'skyBlue', 'eraser');
        col.removeAttribute('style');
    });
}

document.querySelector('#erase').addEventListener('click', eraser);
function eraser() {
    document.querySelectorAll('.column').forEach(col => col.setAttribute('onmouseenter', 'erase(this)'));
}
function erase(e) {
    e.classList.remove('hover', 'skyBlue');
    e.removeAttribute('style');
    e.classList.add('eraser');
}

document.querySelector('#pen').addEventListener('click', pen);
function pen() {
    document.querySelectorAll('.column').forEach(col => col.setAttribute('onmouseenter', 'draw(this)'));
}

onload = createGrid(num);