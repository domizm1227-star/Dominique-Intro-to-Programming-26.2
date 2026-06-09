const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsList = document.getElementById("resultsList");

const charactersName = document.getElementById("charactersName");

const basicInfoDiv = document.getElementById("basicInfo");
const charactersHomeDiv = document.getElementById("charactersHome");
const starshipsDiv = document.getElementById("starships");
const filmsDiv = document.getElementById("films");

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

let currentCharacter = null;

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tab = button.dataset.tab;

        tabContents.forEach(div => div.style.display = "none");

        document.getElementById(tab).style.display = "block";

        if(tab === "basicInfo") loadbasicInfo();
        else if (tab === "charactersHome") loadcharactersHome();
        else if (tab === "starships") loadStarships();
        else if (tab === "films") loadFilms()
    });
});

searchButton.addEventListener("click", () => {
    const term = searchInput.value.trim();
    if (term) fetchCharacters(term);
});

async function fetchCharacters(name) {
    resultsList.innerHTML = "Searching...";

    try {
        const res = await fetch(`https://www.swapi.tech/api/people/?name=${name}`);
        const data = await res.json();

        if (!data.result.length) {
            resultsList.innerHTML = "<li>No characters found</li>";
            return;
        }

        resultsList.innerHTML = "";

        data.result.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item.properties.name;

            li.addEventListener("click", () => fetchCharacterDetails(item.uid));
                
                resultsList.appendChild(li);
        });    } catch (error) {
        resultsList.innerHTML = "<li>Error fetching characters</li>";
        console.error(error);
        }
}

async function fetchCharacterDetails(id) {
    try {
        const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
        const data = await res.json();
        const char = data.result.properties;

        currentCharacter = char;

        characterName.textContent = char.name;

        basicInfoDiv.innerHTML = `
            <p><strong>Birth Year:</strong> ${char.birth_year}</p>
            <p><strong>Height:</strong> $char.height}</p>
            <p><strong>Mass:</strong> ${char.mass}</p>
            <p><strong>Gender:</strong> ${char.gender}</p>}
    `;

    charactersHomeDiv.innerHTML = "";
    starshipsDiv.innerHTML = "";
    filmsDiv.innerHTML = "";

    } catch (error) {
        characterName.textContent = "Error loading character";
    }
}

async function loadCharactersHome() {
    if (!currentCharacter) return;

    charactersHomeDiv.innerHTML = "Loading...";

    try {
        const res = await fetch(currentCharacter.charactersHome);
        const data = await res.json();
        const p = data.result.properties;

        charactersHomeDiv.innerHTML = `
            <p><strong>Name:</strong> ${p.name}</p>
            <p><strong>Climate:</strong> ${p.climate}</p>
            <p><strong>Terrain:</strong> ${p.terrain}</p>
            <p><strong>Population:</strong> ${p.population}</p>
            `;
    } catch {
        charactersHomeDiv.innerHTML = "Could not load characters home";
    }
}

async function loadStarships() {
    if (!currentCharacter) return;

    starshipsDiv.innerHTML = "";

    if(!currentCharacter.starships.length) {
        starshipsDiv.innerHTML = "<p>No starships found</p>";
        return;
    }

    starshipsDiv.innerHTML = "Loading starships...";

    try {
        let html = "";

        for(let url of currentCharacter.starships) {
            const res = await fetch(url);
            const data = await res.json();
            const s = data.result.properties;

            html += `
                <div class="ship-card">
                    <h3>${s.name}</h3>
                    <p><strong>Model:</strong> ${s.model}</p>
                    <p><strong>Manufacturer:</strong> ${s.manufacturer}</p>
                    <p><strong>Cost:</strong> ${s.cost_in_credits}</p>
                    <p><strong>Rating:</strong> ${s.starship_class}</p>
                </div>
            `;
        }
        starshipsDiv.innerHTML = html;
    } catch (error) {
        starshipsDiv.innerHTML = "Could not load starships";            
    }
}

async function loadFilms() {
    if (!currentCharacter) return;

    filmsDiv.innerHTML = "Loading films...";

    try {
        let html = "";

        for(let url of currentCharacter.films) {
            const res = await fetch(url);
            const data = await res.json();
            const f = data.result.properties;

            html += `
                <div class="film-card">
                    <h3>${f.name}</h3>
                    <p><strong>Release Date:</strong> ${f.release_date}</p>
                    <p><strong>Director:</strong> ${f.director}</p>
                    <p><strong>Producer:</strong> ${f.producer}</p>
                </div>
            `;
        }
        filmsDiv.innerHTML = html;
    } catch (error) {
        filmsDiv.innerHTML = "Could not load films";
    }
}