document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchinput'),
          searchButton = document.getElementById('searchbutton'),
          pokemonCards = document.querySelectorAll('.pokemon-card');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm.length < 3) return;

        pokemonCards.forEach(card => {
            card.style.display = card.getAttribute('data-name').toLowerCase().includes(searchTerm) ? '' : 'none';
        });
    });
});
