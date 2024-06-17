async function fetchGames(searchTerm) {
    const apiKey = '9fa7ef1b92634c39ad1f407e41de0ca3'; // Substitua pela sua chave da API da RAWG
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch games');
        }
        const data = await response.json();
        return data.results; 
    } catch (error) {
        console.error('Error fetching games:', error);
        return []; 
    }
}

function renderGames(games) {
    const gamesList = document.getElementById('gamesList');

    gamesList.innerHTML = '';

    if (games.length === 0) {
        gamesList.innerHTML = '<p>No games found.</p>';
        return;
    }

    games.forEach(game => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = `
            <h2>${game.name}</h2>
            <img src="${game.background_image}" alt="${game.name}">
            <p>Released: ${game.released}</p>
            <p>Rating: ${game.rating}</p>
        `;
        gamesList.appendChild(gameElement);
    });
}

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const clearButton = document.getElementById('BotaoApagar');

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        
        const games = await fetchGames(searchTerm);
        renderGames(games); 
    } else {
        alert('Please enter a search term.');
    }

});


clearButton.addEventListener('click', function() {
    searchInput.value = ''; 
    document.getElementById('gamesList').innerHTML = '';
});