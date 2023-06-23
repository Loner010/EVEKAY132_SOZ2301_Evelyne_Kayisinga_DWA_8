import {
  books,
  authors,
  genres,
  BOOKS_PER_PAGE,
} from './data.js';

//In the modified code, you can see that 
//the createBookPreview function is called 
//within the loop that iterates over the matches 
//array, creating a book preview for each book. 
//The resulting preview elements 
//are then appended to the starting document fragment.

function createBookPreview(book) {
  const { author, id, image, title } = book;

  const element = document.createElement('button');
  element.classList = 'preview';
  element.setAttribute('data-preview', id);

  element.innerHTML = `
    <img class="preview__image" src="${image}" />
    <div class="preview__info">
      <h3 class="preview__title">${title}</h3>
      <div class="preview__author">${authors[author]}</div>
    </div>
  `;

  return element;
}


let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

for (const book of matches.slice(0, BOOKS_PER_PAGE)) {
  const bookPreview = createBookPreview(book);
  starting.appendChild(bookPreview);
}

document.querySelector('[data-list-items]').appendChild(starting);

const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement('option');
firstGenreElement.value = 'any';
firstGenreElement.innerText = 'All Genres';
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

document.querySelector('[data-search-genres]').appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement('option');
firstAuthorElement.value = 'any';
firstAuthorElement.innerText = 'All Authors';
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement('option');
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

document.querySelector('[data-search-authors]').appendChild(authorsHtml);

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.querySelector('[data-settings-theme]').value = 'night';
  document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
  document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
  document.querySelector('[data-settings-theme]').value = 'day';
  document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
  document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}

document.querySelector('[data-list-button]').innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0;

document.querySelector('[data-list-button]').innerHTML = `
  <span>Show more</span>
  <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`;

document.querySelector('[data-search-cancel]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = false;
});

document.querySelector('[data-settings-cancel]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay]').open = false;
});

document.querySelector('[data-header-search]').addEventListener('click', () => {
  document.querySelector('[data-search-overlay]').open = true;
  document.querySelector('[data-search-title]').focus();
});

document.querySelector('[data-header-settings]').addEventListener('click', () => {
  document.querySelector('[data-settings-overlay').open = true ;
});
document.querySelector('[data-list-close]').addEventListener('click');