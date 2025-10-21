import axios from 'axios';

const API_KEY = '52855344-2930eb43dc046f1677ebd214e';

export default function getImagesByQuery(query) {
  return axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  }).then(result => result.data.hits);
}
