import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const imgGallery = document.querySelector('.gallery');
const formLoad = document.querySelector('#loader');

let lightbox = new SimpleLightbox('.gallery a', {
  sourceAttr: 'href',
  captionsData: 'alt',
  overlayOpacity: 0.8,
  captionDelay: 250,
  className: 'lightbox',
});

export default function createGallery(array) {
  imgGallery.innerHTML = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
    <a class="gallery-link" href="${largeImageURL}">
    <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
    </a>
    <div class="card-info">
    <p>${likes}</p>
    <p>${views}</p>
    <p>${comments}</p>
    <p>${downloads}</p></div>
    </li>`
    )
    .join(' ');
  lightbox.refresh();
}

export function clearGallery() {
  imgGallery.innerHTML = '';
}

export function showLoader() {
  formLoad.classList.remove('hidden');
}

export function hideLoader() {
  formLoad.classList.add('hidden');
}
