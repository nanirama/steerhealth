import videoList from './videos.json';
import imagesList from './images.json';

export const videoOptions = videoList.videos.map((filename) => ({
  title: filename,                      // shown in dropdown
  value: filename,       // saved in Sanity
}));

export const imagesOptions = imagesList.images.map((filename) => ({
  title: filename,                      // shown in dropdown
  value: filename,       // saved in Sanity
}));