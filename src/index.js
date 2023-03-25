import './css/styles.css';
import { RestCountriesAPI } from './js/fetchCountries';
import Notiflix from 'notiflix';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

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
            countryListEl.innerHTML = ``;
            countryInfoEl.innerHTML = ``;
            return
        } else if (res.length === 1) {
            countryListEl.innerHTML = ``;
            const { capital, flags, languages, name, population } = res[0];
            const infoHTML = `
            <img class="country-info__img" src="${flags.svg}" alt="${flags.alt}" width="40" height="30">
            <p class="country-info__name">${name.official}</p>
            <p class="country-info__capital"><span class="country-info__span">Capital: </span>${capital[0]}</p>
            <p class="country-info__population"><span class="country-info__span">Population: </span>${population}</p>
            <p class="country-info__languages"><span class="country-info__span">Languages: </span>${Object.values(languages)}</p>`;
            countryInfoEl.innerHTML = infoHTML;
            return
        } else {
            countryInfoEl.innerHTML = ``;
            let htmlList = res.map((element) => {
                const { flags, name } = element;
                return (`
            <li class="country-list__item">
            <img src="${flags.svg}" alt="${flags.alt}" class="country-list__img" width="24" height="24">
            <p class="country-list__text">${name.official}</p>
            </li>`);
            })
            countryListEl.innerHTML = htmlList.join("");

        }

    }).catch((err) => {
        if (err.message === '404') {
            countryListEl.innerHTML = ``;
            countryInfoEl.innerHTML = ``;
            Notiflix.Notify.failure("Oops, there is no country with that name");
            return
        }
        return console.log(err)
    })


};





