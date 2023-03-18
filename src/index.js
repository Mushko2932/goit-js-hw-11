import { getRefs } from './get-refs';
import { createMarkup } from './markup';
import Notiflix from 'notiflix';
import {ImgApiService} from './fetch-images';
import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();

refs.btnShowMore.style.display = 'none';
refs.form.addEventListener('submit', onFormSubmit);
refs.btnShowMore.addEventListener('click', onShowMore);

const imgApiService = new ImgApiService();
// const currentPage = imgApiService.page;
// imgApiService.hits = data.totalHits;

function onFormSubmit(e) {
  e.preventDefault();

  clearGallery();
  imgApiService.query = e.target.searchQuery.value.trim();

  if (imgApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  };  

  imgApiService.resetPage();
  imgApiService
    .fetchImages()
    .then(createImgMarkup)
    .then(
      showNotifications()
    );

  refs.btnShowMore.style.display = 'block';
}

function onShowMore() {
  imgApiService.fetchImages().then(createImgMarkup).then(showNotifications());
}

function createImgMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function showNotifications(data) {
  // refs.btnShowMore.style.display = 'none';

  imgApiService.fetchImages().then(data => {
    const curentPage = imgApiService.page - 1;
    imgApiService.hits = data.totalHits;

    if (curentPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${imgApiService.hits} images.`);
      refs.btnShowMore.style.display = 'block';
    }

    if (!imgApiService.hits) {
      refs.btnShowMore.style.display = 'none';

      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (!data.hits.length) {
      refs.btnShowMore.style.display = 'none';
      return Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    createImgMarkup(data.hits);
  });
}