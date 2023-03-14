import axios from 'axios';

export async function fetchImages(images) {
  const BASE_URL = 'https://pixabay.com/api/';
  const KEY = 'key=34323809-5db8daf5fc25ed7f9dffec99f';
  try {
    const response = await axios.get(
      `${BASE_URL}?${KEY}&q=cats&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
    );
    const images = await response.json();
    return response;
  } catch (error) {
    console.log('error :>> ', error);
  };
  
}
