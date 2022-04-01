// Создание и рендер разметки по массиву данных galleryItems и предоставленному шаблону элемента
// галереи.Используй готовый код из первого задания.

// Подключение скрипта и стилей библиотеки используя CDN сервис cdnjs.Необходимо добавить ссылки на
// два файла: simple - lightbox.min.js и simple - lightbox.min.css.

// Инициализация библиотеки после того как элементы галереи созданы и добавлены в div.gallery.Для
// этого ознакомься с документацией SimpleLightbox - в первую очередь секции «Usage» и «Markup».

// Посмотри в документации секцию «Options» и добавь отображение подписей к изображениям из атрибута
// alt.Пусть подпись будет снизу и появляется через 250 миллисекунд после открытия изображения.

import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');
const galleryEl = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<a class="gallery__item" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        alt="${description}"
      />
    </a>`,
  )
  .join('');

galleryRef.insertAdjacentHTML('afterbegin', galleryEl);

// const galleryLinkRefs = document.querySelectorAll('.gallery__item');
// galleryLinkRefs.forEach(galleryLinkRef => {
//   const onGalleryLink = e => {
//     e.preventDefault();

//     console.log('click');
//   };
//   galleryLinkRef.addEventListener('click', onGalleryLink);
// });

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
