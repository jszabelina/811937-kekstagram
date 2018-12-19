'use strict';

(function (data) {
  /**
   * Возвращает DOM - элемент для фотографии
   * с проставленными ссылками, количеством лайков и комментарием
   * @param {Object} picture
   * @return {Node}
   */
  function getPictureElement(picture) {
    var template = document.querySelector('#picture').content.cloneNode(true);
    template.querySelector('.picture__img').src = picture.url;
    template.querySelector('.picture__img').dataset.key = picture.key;
    template.querySelector('.picture__likes').textContent = picture.likes;
    template.querySelector('.picture__comments').textContent = picture.comments.length;
    return template;
  }
  data.pushPictureInGallery();

  window.pictures = {
    getPictureElement: getPictureElement
  };

})(window.data);
