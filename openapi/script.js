let globalCharacters = [];
let globalFilms = [];
let dataLoaded = false;

async function fetchData() {
  const content = document.getElementById('content-display');
  content.innerHTML = '<p class="loading">Loading Star Wars data...</p>';

  try {
    const [characterResponse, filmResponse] = await Promise.all([
      fetch('https://www.swapi.tech/api/people?page=1&limit=80'),
      fetch('https://www.swapi.tech/api/films')
    ]);

    const characterData = await characterResponse.json();
    const filmData = await filmResponse.json();

    globalCharacters = characterData.results || [];
    globalFilms = filmData.result || [];

    dataLoaded = true;
    switchTab('characters');
  } catch (error) {
    console.error('Error fetching data from SWAPI:', error);
    content.innerHTML = '<p class="error">Failed to load data. Please try again later.</p>';
  }
}

function setActiveTab(tabName) {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    const target = btn.getAttribute('data-tab');
    btn.classList.toggle('active', target === tabName);
  });
}

function switchTab(tabName) {
  if (!dataLoaded) return;

  const content = document.getElementById('content-display');
  content.innerHTML = '';
  setActiveTab(tabName);

  if (tabName === 'characters') {
    renderCharacters(content);
  } else if (tabName === 'films') {
    renderFilms(content);
  } else if (tabName === 'matcher') {
    renderMatcher(content);
  }
}

function renderCharacters(container) {
  const heading = document.createElement('h2');
  heading.textContent = 'Star Wars Characters';
  container.appendChild(heading);

  const list = document.createElement('ul');
  list.className = 'card-list';

  globalCharacters.forEach(char => {
    const item = document.createElement('li');
    item.className = 'card-item';
    item.innerHTML = `<strong>${char.name}</strong><span>UID: ${char.uid}</span>`;
    list.appendChild(item);
  });

  container.appendChild(list);
}

function renderFilms(container) {
  const heading = document.createElement('h2');
  heading.textContent = 'Star Wars Films';
  container.appendChild(heading);

  const list = document.createElement('ul');
  list.className = 'card-list';

  globalFilms.forEach(film => {
    const props = film.properties;
    const item = document.createElement('li');
    item.className = 'card-item';
    item.innerHTML = `
      <strong>${props.title}</strong>
      <small>Episode ${props.episode_id} • Director: ${props.director}</small><br />
      <small>Released: ${props.release_date}</small>
    `;
    list.appendChild(item);
  });

  container.appendChild(list);
}

function renderMatcher(container) {
  const heading = document.createElement('h2');
  heading.textContent = 'Character Film Matcher';
  container.appendChild(heading);

  const controls = document.createElement('div');
  controls.className = 'matcher-controls';

  const label = document.createElement('label');
  label.className = 'matcher-label';
  label.setAttribute('for', 'char-select');
  label.textContent = 'Choose a character:';
  controls.appendChild(label);

  const select = document.createElement('select');
  select.id = 'char-select';
  select.className = 'matcher-select';

  globalCharacters.forEach(char => {
    const option = document.createElement('option');
    option.value = char.url;
    option.textContent = char.name;
    select.appendChild(option);
  });

  controls.appendChild(select);
  container.appendChild(controls);

  const resultsDiv = document.createElement('div');
  resultsDiv.id = 'match-results';
  resultsDiv.className = 'matcher-results';
  container.appendChild(resultsDiv);

  select.addEventListener('change', event => {
    const selectedCharUrl = event.target.value;
    updateMatcherResults(selectedCharUrl, resultsDiv);
  });

  if (globalCharacters.length > 0) {
    updateMatcherResults(globalCharacters[0].url, resultsDiv);
  }
}

function updateMatcherResults(selectedCharUrl, resultsDiv) {
  resultsDiv.innerHTML = '';

  const matchingFilms = globalFilms.filter(film => {
    const chars = film.properties.characters || [];
    return chars.includes(selectedCharUrl);
  });

  if (matchingFilms.length === 0) {
    resultsDiv.innerHTML = '<p class="no-match">No recorded film matches found for this character.</p>';
    return;
  }

  const heading = document.createElement('h3');
  heading.textContent = 'Appears In:';
  resultsDiv.appendChild(heading);

  const list = document.createElement('ul');
  list.className = 'card-list';

  matchingFilms.forEach(film => {
    const li = document.createElement('li');
    li.className = 'card-item';
    li.innerHTML = `<strong>${film.properties.title}</strong> (Episode ${film.properties.episode_id})`;
    list.appendChild(li);
  });

  resultsDiv.appendChild(list);
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');
      switchTab(tabName);
    });
  });

  fetchData();
});
