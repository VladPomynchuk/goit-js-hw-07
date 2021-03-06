// Задание 1 - галерея изображений
// Создай галерею с возможностью клика по её элементам и просмотра полноразмерного изображения в
// модальном окне.Посмотри демо видео работы галереи.

// Выполняй это задание в файлах 01-gallery.html и 01-gallery.js. Разбей его на несколько подзадач:

// Реализация делегирования на div.gallery и получение url большого изображения.
// Подключение скрипта и стилей библиотеки модального окна basicLightbox.Используй CDN сервис jsdelivr
//  и добавь в проект ссылки на минифицированные(.min) файлы библиотеки.
// Открытие модального окна по клику на элементе галереи.Для этого ознакомься с документацией и
// примерами.
// Замена значения атрибута src элемента < img > в модальном окне перед открытием.Используй готовую
// разметку модального окна с изображением из примеров библиотеки basicLightbox.
// Разметка элемента галереи
// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе < img >, и
// указываться в href ссылки.Не добавляй другие HTML теги или CSS классы кроме тех, что есть в этом
// шаблоне.

// <div class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </div>
//     Обрати внимание на то, что изображение обернуто в ссылку, а значит при клике по умолчанию
// пользователь будет перенаправлен на другую страницу.Запрети это поведение по умолчанию.

// Закрытие с клавиатуры
// ВНИМАНИЕ
// Этот функционал не обязателен при сдаче задания, но будет хорошей дополнительной практикой.

// Добавь закрытие модального окна по нажатию клавиши Escape.Сделай так, чтобы прослушивание
// клавиатуры было только пока открыто модальное окно.У библиотеки basicLightbox есть метод для
// программного закрытия модального окна.

import { galleryItems } from './gallery-items.js';

const galleryRef = document.querySelector('.gallery');

const galleryEl = galleryItems
  .map(
    ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`,
  )
  .join('');

galleryRef.insertAdjacentHTML('afterbegin', galleryEl);

const galleryLinkRefs = document.querySelectorAll('.gallery__link');
galleryLinkRefs.forEach(galleryLinkRef => {
  const onGalleryLink = e => {
    e.preventDefault();

    console.log('click');
  };
  galleryLinkRef.addEventListener('click', onGalleryLink);
});

const onGalleryClick = e => {
  if (e.target.nodeName !== 'IMG') {
    return;
  }

  const gallery = basicLightbox.create(
    `
      <div class="modal">
          <img src="${e.target.dataset.source}" >
      </div>
  `,
  );
  gallery.show();

  const onModalClose = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      window.removeEventListener('keydown', onModalClose);
      gallery.close();
    }
  };

  const onWindowClick = e => {
    if (e.target.nodeName === 'IMG') {
      return;
    }
    window.removeEventListener('keydown', onModalClose);
  };
  //   console.log(gallery.close());
  window.addEventListener('keydown', onModalClose);
  window.addEventListener('click', onWindowClick);
};

galleryRef.addEventListener('click', onGalleryClick);
