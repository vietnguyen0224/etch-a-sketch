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
            row.appendChild(grid('column'));
        }
        wrapper.appendChild(row);
    }
}

// Create rows and cols
function grid(role) {
    let div = document.createElement('div');
    div.classList.add(role);
    div.setAttribute("onmouseenter", "draw(this)");
    return div;
}

// Draw
function draw(e) {
    e.classList.add("hover");
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
document.querySelector('.gray').addEventListener('click', gray);
function gray() {
    
}
//document.querySelector('.random').addEventListener('click', random);

onload = createGrid(num);