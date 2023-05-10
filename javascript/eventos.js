const box = document.getElementById('box');

box.addEventListener('mouseenter', () => {
    box.classList.replace('inside', 'aside')

})

box.addEventListener('mouseleave', () => {
    box.classList.replace('aside', 'inside')
}) 