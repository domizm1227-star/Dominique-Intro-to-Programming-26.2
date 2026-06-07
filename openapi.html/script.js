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

asyncfunction fetchCharacterDetails(id) {
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