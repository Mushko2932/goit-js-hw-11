import { getRefs } from './get-refs';

const refs = getRefs();

export function createMarkup(images) {
    const markup = images.map(
        img => {
            `<div class="photo-card">
                 <img src="" alt="" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                        </p>
                    </div>
            </div>`
        }
    ).join('');

    refs.gallery.insertAdjacentHTML('beforeend', markup);
    refs.gallery.innerHTML = '';
}