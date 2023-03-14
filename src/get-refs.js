export function getRefs() {
    return {
      form: document.querySelector('.search-form'),
      input: document.querySelector('input[type = "text"]'),
      btn: document.querySelector('button[type = "submit"]'),
      gallery: document.querySelector('.gallery'),
      btnMore: document.querySelector('.load-more'),
    };
};