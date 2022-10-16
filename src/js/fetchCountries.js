const base_url = 'https://restcountries.com/v3.1/name';

export function fetchCountries(searchValue) {
  return fetch(`${base_url}/${searchValue}?fields=capital,languages,name,flags,population`).then(resp => {
    if (!resp.ok) {
      throw new Error('fail');
    }
    return resp.json();
  });
}
