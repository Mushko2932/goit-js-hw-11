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
refs.btn.addEventListener('click', onBtnClick);
refs.btnShowMore.addEventListener('click', onShowMore);


function onFormSubmit(e, totalHits) {
  e.preventDefault();

  clearGallery();
  imgApiService.query = e.target.elements.searchQuery.value.trim();

  if (imgApiService.query === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  showNotifications();

  imgApiService.resetPage;
  imgApiService.fetchImages().then(createImgMarkup);

  refs.btnShowMore.style.display = 'block';

  // page = 1;

  // const inputField = refs.input.value.trim();

  // if (inputField) {
  //   return fetchImages(inputField)
  //     .then(data => {
  //       createMarkup(data);
  //     })
  //     .catch(error => {
  //       console.log('error :>> ', error);
  //       Notiflix.Notify.failure(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //     });
  // }

  // if (page === 1) {
  //   refs.btnMore.style.display = 'block';
  // }

  // if (inputField === []) {
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }

  // if (images > totalHits) {
  //   Notiflix.Notify.warning(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  // }
}

function onBtnClick() {
  // imgApiService.fetchImages();

  //   refs.gallery.innerHTML = '';

  //   refs.btnMore.style.display = 'block';
  //   const inputField = refs.input.value.trim();
  //   page += 1;
  //   fetchImages();
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

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});

function showNotifications(length, totalHits) {
  if (length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  if (length === 1) {
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
