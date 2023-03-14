import axios from 'axios';
import { fetchImages } from './fetch-images';
import { getRefs } from './get-refs';
import { createMarkup } from './markup';
import './css/styles.css';
import Notiflix from 'notiflix';


const refs = getRefs();

refs.form.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onBtnClick);

function onSubmit(e) {
    e.preventDefault();

  const search = e.target.elements.searchQuery.value;

    fetchImages();

    if (e.target.value === []) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
    }
}

function onBtnClick(e) {
  fetchImages();
}





