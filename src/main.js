import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import createGallery from './js/render-functions.js';
import getImagesByQuery from './js/pixabay-api.js';
import { clearGallery } from './js/render-functions.js';
import { showLoader, hideLoader } from './js/render-functions.js';

const forma = document.querySelector('.form');
const formInput = document.querySelector('input[name="search-text"]');

forma.addEventListener('submit', handleSubmit);
hideLoader();

//creating gallery after submit event
function handleSubmit(event) {
  event.preventDefault();
  showLoader();
  clearGallery();

  const userChoice = formInput.value.trim().toLowerCase();

  if (!userChoice) {
    iziToast.warning({
      title: 'Caution',
      message: 'Please select at least one item.',
      color: 'yellow',
      position: 'topRight',
    });
    hideLoader();
    return;
  }

  //сhecking if the array of images contains a tag equal to the user query
  getImagesByQuery(userChoice)
    .then(hits => {
      let filteredHits = hits.filter(hit =>
        hit.tags.toLowerCase().split(', ').includes(userChoice)
      );
      //checking if array contains data
      if (filteredHits.length === 0) {
        iziToast.warning({
          title: 'Caution',
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          color: 'red',
          position: 'topRight',
        });
        return;
      }

      //gallery's visualisation function
      createGallery(filteredHits);
    })
    .catch(error =>
      iziToast.warning({
        title: 'Caution',
        message: error.message,
        color: 'red',
        position: 'topRight',
      })
    )
    .finally(() => {
      hideLoader();
    });
}
