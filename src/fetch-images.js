import { Notify } from "notiflix";

export function fetchImages(img) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = 'key=34323809-5db8daf5fc25ed7f9dffec99f';

    return fetch(
        `${BASE_URL}?${KEY}&q=yellow+flowers&image_type=photo&orientation=horizontal&safesearch=true`
    )
        .then(res => res.json)
        .then(data => console.log('data :>> ', data))
        .catch(
            error =>
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      );
}