export function getRefs() {
    return {
      form: document.querySelector('.search-form'),
      input: document.querySelector('type[text]'),
      btn: document.querySelector('type[submit]'),
      gallery: document.querySelector('.gallery'),
      btnMore: document.querySelector('.load-more'),
    };
};