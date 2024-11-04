function openModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('zoom');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
    modal.querySelector('.modal-content').classList.remove('zoom');
}

function confirmSubmit() {
    window.location.href = "https://forms.gle/H3gf8qCZMdF39aUj8"; // Redirect to form
}