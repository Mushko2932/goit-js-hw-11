import { getRefs } from './get-refs';
import { createMarkup } from './markup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import ImgApiService from './fetch-images';
import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const imgApiService = new ImgApiService();

const refs = getRefs();

refs.btnShowMore.style.display = 'none';
refs.form.addEventListener('submit', onFormSubmit);
refs.btnShowMore.addEventListener('click', onShowMore);


function onFormSubmit(e, totalHits) {
  e.preventDefault();

  clearGallery();
  imgApiService.query = e.target.elements.searchQuery.value.trim();

  if (imgApiService.query >= 1) {
    Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
  }

  if (imgApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  imgApiService.resetPage;
  imgApiService.fetchImages().then(createImgMarkup);

  refs.btnShowMore.style.display = 'flex';
}

function onShowMore() {
  imgApiService.fetchImages().then(createImgMarkup);
}

function createImgMarkup(response) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(response));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showNotifications(length, totalHits) {
  if (length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (page === 1) {
    refs.btnShowMore.style.display = 'block';

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  if (length < 40) {
    refs.btnShowMore.style.display = 'none';

    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
};
