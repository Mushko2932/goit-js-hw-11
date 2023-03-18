import { getRefs } from './get-refs';
import SimpleLightbox from 'simplelightbox';

const refs = getRefs();

const simplelightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
  enableKeyboard: true,
});

export function createMarkup(data) {
  const markup = data
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery-item" href="${largeImageURL}">
            <div class="photo-card">
            <div class="photo-box">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </div>
                  <div class="info">
                    <p class="info-text"><b>Likes</b> ${likes}</p>
                    <p class="info-text"><b>Views</b> ${views}</p>
                    <p class="info-text"><b>Comments</b> ${comments}</p>
                    <p class="info-text"><b>Downloads</b> ${downloads}</p>
                  </div>
            </div>
          </a>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);

  simplelightbox.refresh();
}
