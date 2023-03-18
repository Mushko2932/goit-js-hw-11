import { getRefs } from './get-refs';
import { createMarkup } from './markup';
import Notiflix from 'notiflix';
import { imgApiService } from './fetch-images';
import { lightbox } from './simplelightbox';
import './css/styles.css';

const refs = getRefs();

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
    showNotifications();
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
    showNotifications();
  } catch (error) {
    console.log('error :>> ', error);
  }
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

async function showNotifications(data) {
  // refs.btnShowMore.style.display = 'none';

  const { hits, totalHits, total } = await imgApiService.fetchImages();

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
    createMarkup(hits);
  });
}
