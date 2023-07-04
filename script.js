const wrapper = document.querySelector('.wrapper');

for (let i = 1; i < 257; i++) {
    wrapper.innerHTML += `<div class='grid' id=${i}>${i}</div>`
}