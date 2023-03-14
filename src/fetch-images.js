import axios from 'axios';

export async function fetchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';

  const options = {
    params: {
      key: '34323809-5db8daf5fc25ed7f9dffec99f',
      q: value,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get(BASE_URL, options);
    const images = await response.json();
    return images;
 
  } catch (error) {
    console.log('error :>> ', error);
  };
}
