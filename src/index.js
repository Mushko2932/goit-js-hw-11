import { getRefs } from './get-refs';
import { createMarkup } from './markup';
import Notiflix from 'notiflix';
import { imgApiService } from './fetch-images';
import { lightbox } from './simplelightbox';
import './css/styles.css';

const refs = getRefs();
let currentPage = 1;

refs.btnShowMore.style.display = 'none';
refs.form.addEventListener('submit', onFormSubmit);
refs.btnShowMore.addEventListener('click', onShowMore);

async function onFormSubmit(e) {
  e.preventDefault();

  clearGallery();
  imgApiService.query = e.target.searchQuery.value.trim();

  if (!imgApiService.query) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  try {
    imgApiService.resetPage();
    const { hits, totalHits, total } = await imgApiService.fetchImages();
    createMarkup(hits);
    lightbox.refresh();
    showNotifications(hits.length, totalHits);
  } catch (error) {
    console.log('error :>> ', error);
  }

  refs.btnShowMore.style.display = 'block';
}

async function onShowMore() {
  try {
    const { hits, totalHits, total } = await imgApiService.fetchImages();
    createMarkup(hits);
    lightbox.refresh();
    if (hits.length < 40) {
      refs.btnShowMore.style.display = 'none';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    
  } catch (error) {
    console.log('error :>> ', error);
  }
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

  if (currentPage === 1) {
    refs.btnShowMore.style.display = 'block';
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}
