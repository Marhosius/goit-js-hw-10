import './css/styles.css';
import { RestCountriesAPI } from './js/fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 1300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const restCountriesAPI = new RestCountriesAPI();

const inputListener = inputEl.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(el) {
    const searchingValue = el.target.value.trim();
    restCountriesAPI.searchingName = searchingValue;
    restCountriesAPI.fetchCountries().then(res => {
        if (res.length > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return
        } else if (res.length === 1) {
            console.dir(res[0]);
            const { capital, flags, languages, name, population } = res[0];
            console.log(capital, flags.svg, languages, name, population);
            const infoHTML = `
            <svg class="country-info__flag" width="50" height="50"> <use href=${flags.svg}></use></svg>
            <p class="country-info__name">${name.official}</p>
            <p class="country-info__capital">${capital[0]}</p>
            <p class="country-info__population">${population}</p>
            <p class="country-info__languages">${languages}</p>`;
            countryInfoEl.innerHTML = infoHTML;
            return
        } else {
            console.log(`final`);
        }

    }).catch((err) => {
        if (err.message === '404') {
            Notiflix.Notify.failure("Oops, there is no country with that name");
            return
        }
        return console.dir(err)
    })


};





