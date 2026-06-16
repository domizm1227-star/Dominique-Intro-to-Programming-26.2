let globalCharacters = [];
let globalFilms = [];

//Automatically fetch data when the script loads
async function initialData() {
    const container = document.getElementById('content-display');
    container.innerHTML = '<p class="loading">Loading Star Wars data...</p>';

    try {
        //Fetching characters with a result of 10 with a limit use of 100
        const characterResponse = await fetch('https://www.swapi.tech/api/people?page=1&limit=80');
        const characterData = await characterResponse.json();
        globalCharacters = characterData.results; //Should be an array of {uid, name, url}

        //Fetching Films
        const filmResponse = await fetch('https://www.swapi.tech/api/films');
        const filmData = await filmResponse.json();
        globalFilms = filmData.result; //Should be an array of film objects containing properties

        //Showing first tab
        switchTab('characters');
    } catch (error) {
        console.error("Error fetching data from SWAPI:", error);
        container.innerHTML = '<p class="error">Failed to load data. Please try again later.</p>';
    }
}

//Control tab switching
function switchTab(tabName) {
    const container = document.getElementById('content-display');
    container.innerHTML = ''; //Clears previous content

    if (tabName === 'characters') {
        renderCharacters(container);
    } else if (tabName === 'films') {
        renderFilms(container);
    } else if (tabName === 'comparison') {
        renderComparisonTool(container);
    }
}

//Characters List
function renderCharacters(container) {
    const heading = document.createElement('h2');
    heading.textContent = "Star Wars Characters";
    container.appendChild(heading);

    const list = document.createElement('ul');
    list.className = "card-list";

    globalCharacters.forEach(char => {
        const item = document.createElement('li');
        item.className = "card-item";
        item.innerHTML = `<strong>${char.name}</strong>`;
        list.appendChild(item);
    });
    container.appendChild(list);
}

//Films List
function renderFilms(container) {
    const heading = document.createElement('h2');
    heading.textContent = "Star Wars Films";
    container.appendChild(heading);

    const list = document.createElement('ul');
    list.className = "card-list";

    globalFilms.forEach(film => {
        const item = document.createElement('li');
        item.className = "card-item";

        const props = film.properties;
        item.innerHTML = `
        <strong>${props.title}</strong>
        <small>Director: ${props.director} | Released: ${props.release_date}</small>`;
        list.appendChild(item);
    });
    container.appendChild(list);
}

//Character to Film Matcher Side by Side
function renderComparisonTool(container) {
    const heading = document.createElement('h2');
    heading.textContent = "Character Film Matcher";
    container.appendChild(heading);

    //Create Dropdown Label
    const label = document.createElement('label');
    label.setAttribute('for', 'char-select');
    label.textContent = "Choose a Character: ";
    container.appendChild(label);

    //Creating Selector
    const select = document.createElement('select');
    select.id = "char-select";

    //Populate options with characters
    globalCharacters.forEach(char => {
        const option = document.createElement('option');
        option.value = char.url;
        option.textContent = char.name;
        select.appendChild(option);
    });
    container.appendChild(select);

    //Create results
    const resultsDiv = document.createElement('div');
    resultsDiv.id = "match-results";
    container.appendChild(resultsDiv);

    //Event listener to check for matches when character changes
    select.addEventListener('change', (event) => {
        const selectedCharUrl = event.target.value;
        resultsDiv.innerHTML = '';

        //Filter containing this characters exact API URL string
        const matchingFilms = globalFilms.filter(film => {
            return film.properties.characters.includes(selectedCharUrl);
        });

        if (matchingFilms.length === 0) {
            resultsDiv.innerHTML = '<p class="no-match">No recorded film matches found for this character in the database range.</p>';
        } else {
            const resultHeading = document.createElement('h3');
            resultHeading.textContent = "Appears In:";
            resultsDiv.appendChild(resultHeading);

            const resultList = document.createElement('ul');
            matchingFilms.forEach(film => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${film.properties.title}</strong> (Episode ${film.properties.episode_id})`;
                resultList.appendChild(li);
            });
            resultsDiv.appendChild(resultList);
        }
    });

    //Triggering initial selection display
    if (globalCharacters.length > 0) {
        select.dispatchEvent(new Event('change'));
    }
}

window.onload = initialData;