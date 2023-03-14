import { fetchImages } from './fetch-images';
import { getRefs } from './get-refs';
import { createMarkup } from './markup';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = getRefs();
let page = 1;

refs.form.addEventListener('submit', onSubmit);
refs.btn.addEventListener('click', onBtnClick);
refs.btnMore.style.display = 'none';

function onSubmit(e) {
  e.preventDefault();

  page = 1;

  const inputField = refs.input.value.trim();

  if (inputField) {
    return fetchImages(inputField)
      .then(data => {
        createMarkup(data);
      })
      .catch(error => {
         console.log('error :>> ', error);
        // Notiflix.Notify.failure(
        //   'Sorry, there are no images matching your search query. Please try again.'
        // );
      });
    refs.gallery.innerHTML = '';
  }

  // if (inputField === []) {
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }

  if (images > totalHits) {
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function onBtnClick(e) {
  refs.btnMore.style.display = 'block';
  const inputField = refs.input.value.trim();
  page += 1;
  fetchImages();
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
});





