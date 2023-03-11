const axios = require('axios');
import { fetchImages } from './fetch-images';
import { getRefs } from './get-refs';
import {markup} from './markup';
import './css/styles.css';

fetchImages();

const refs = getRefs();

refs.input.addEventListener('input', onInput);

function onInput(e) {
    e.preventDefault();
    createMarkup();
}





