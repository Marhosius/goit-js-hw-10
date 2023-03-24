import './css/styles.css';
import { RestCountriesAPI } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');

const restCountriesAPI = new RestCountriesAPI();

restCountriesAPI.searchingName = `ukraine`;

const resault = restCountriesAPI.fetchCountries();

setTimeout(() => {
    console.log(resault);
}, 300);
