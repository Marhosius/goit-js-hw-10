

export class RestCountriesAPI {
    #BASE_URL = 'https://restcountries.com/v3.1/';
    #BASE_SEARCH_FIELD = 'fields=name,capital,population,flags,languages';

    searchingName = null;

    fetchCountries() {
        return fetch(`${this.#BASE_URL}/name/${this.searchingName}?${this.#BASE_SEARCH_FIELD}`).then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
    }

}