import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import markup from './templates/markup.hbs';
import severalCountriesMarkup from './templates/severalCountriesMarkup.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
// import { useDebounce } from 'use-debounce';

// console.log(debounce);

// var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
// const list = document.querySelector('.country-list')
const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  container: document.querySelector('.country-info'),
};

// console.log(refs.input);
// console.log(refs.list);
// console.log(refs.container);

// console.log('asdasdsa');

const inputValue = refs.input.value;

const onSearch = e => {
  const searchValue = e.target.value;
  refs.list.innerHTML = '';
  if (searchValue.length) {
    fetchCountries(searchValue)
      .then(updateTemplate)
      .catch(() => {
        Notify.failure('Oops, there is no country with that name');
      });

    console.log(refs.input.value);
  }
  console.log(refs.input.value);
};

const onSearchDebounced = debounce(onSearch, DEBOUNCE_DELAY);
refs.input.addEventListener('input', e => {
  refs.input.value = refs.input.value.trim();
  onSearchDebounced(e);
});

function updateTemplate(data) {
  if (data.length >= 2 && data.length <= 10) {
    return refs.list.insertAdjacentHTML('beforeend', severalCountriesMarkup(data));
  }
  if (data.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.', {
      timeout: 1000,
      showOnlyTheLastOne: true,
    });
  }

  const templateData = data.map(country => {
    return {
      ...country,
      languagesString: Object.values(country.languages),
    };
  });
  refs.list.insertAdjacentHTML('beforeend', markup(templateData));
}
