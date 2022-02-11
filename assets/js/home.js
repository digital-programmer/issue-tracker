// completed projects are marks red and open are marked green
window.addEventListener('load', function () {
    document.querySelectorAll('.project-status').forEach((status) => {
        status.textContent.trim() == 'open' ? status.style.color = 'green' : status.style.color = 'red';
    });
})



