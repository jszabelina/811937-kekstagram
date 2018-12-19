'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');

  /**
   * функция принимает объект фотографии и показывает её как большую
   * @param {Object} picture
   * @return {void}
   */
  var showBigImage = function (picture) {
    bigPicture.classList.remove('hidden');

    var bigPicturesImg = bigPicture.querySelector('.big-picture__img img');
    bigPicturesImg.src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

    var ulSocialComments = bigPicture.querySelector('.social__comments');
    ulSocialComments.innerHTML = '';

    /**
     * Создает DOM-элемент <li> комментария и наполняет его аватаром и сообщением
     * @param {Object} commentItem
     * @return {Node}
     */
    function getCommentElement(commentItem) {
      var templateLi = document.querySelector('#comment').content.cloneNode(true);

      templateLi.querySelector('.social__picture').src = commentItem.avatar;
      templateLi.querySelector('.social__text').textContent = commentItem.message;
      return templateLi;
    }
    for (var currentCommentIndex = 0; currentCommentIndex < picture.comments.length; currentCommentIndex++) {
      ulSocialComments.appendChild(getCommentElement(picture.comments[currentCommentIndex]));
    }

    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  };

  var picturesElements = window.picturesSection.querySelectorAll('.picture');

  for (var picturesIndex = 0; picturesIndex < picturesElements.length; picturesIndex++) {
    picturesElements[picturesIndex].addEventListener('click', function (elem) {
      showBigImage(window.pictures[elem.target.dataset.key]);
    });
  }

  var closeBigImage = bigPicture.querySelector('#picture-cancel');
  closeBigImage.addEventListener('click', function () {
    window.bigPicture.classList.add('hidden');
  });
  var closeBigPicture = function () {
    if (!bigPicture.classList.contains('hidden')) {
      bigPicture.classList.add('hidden');
    }
  };

  window.preview = {
    closeBigPicture: closeBigPicture
  };
})();

