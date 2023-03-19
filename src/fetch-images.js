import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34323809-5db8daf5fc25ed7f9dffec99f';
export class ImgApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;
  }

  async fetchImages() {
    const OPTIONS = new URLSearchParams({
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

      const response = await axios(`${BASE_URL}?${OPTIONS.toString()}`);
      this.incrementPage();
      return response.data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get hits() {
    return this.totalHits;
  }

  set hits(newTotalHits) {
    this.totalHits = newTotalHits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

export const imgApiService = new ImgApiService();