"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

window.addEventListener('DOMContentLoaded', function () {
  var tabsParent = document.querySelector('.tabheader__items'),
      tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      loader = document.querySelector('.loader'); // Loader

  setTimeout(function () {
    loader.style.opacity = '0';
    setTimeout(function () {
      loader.style.display = 'none';
    }, 500);
  }, 2000); // Tabs

  function hideTabContent() {
    tabsContent.forEach(function (item) {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(function (item) {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent() {
    var i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (event) {
    var target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach(function (item, idx) {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  }); // Timer

  var deadline = '2022-12-11';

  function getTimeRemaining(endtime) {
    var days, hours, minutes, seconds;
    var timer = Date.parse(endtime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor(timer / (1000 * 60 * 60) % 24);
      minutes = Math.floor(timer / 1000 / 60 % 60);
      seconds = Math.floor(timer / 1000 % 60);
    }

    return {
      timer: timer,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0".concat(num);
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    var timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updatClock, 1000);
    updatClock();

    function updatClock() {
      var t = getTimeRemaining(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); // Modal

  var modalTrigger = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalCloseBtn = document.querySelector('[data-close]');

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(openModal);
  }

  modalTrigger.forEach(function (item) {
    item.addEventListener('click', openModal);
  });
  modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) {
    if (e.target == modal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  }); // const modalTimerId = setTimeout(openModal, 5000)

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll); // Class

  var MenuCard =
  /*#__PURE__*/
  function () {
    function MenuCard(src, alt, title, descr, price, parentSelector) {
      _classCallCheck(this, MenuCard);

      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 11000;
      this.chageToUZS();
    }

    _createClass(MenuCard, [{
      key: "chageToUZS",
      value: function chageToUZS() {
        this.price = this.price * this.transfer;
      }
    }, {
      key: "render",
      value: function render() {
        var element = document.createElement('div');

        if (this.classes.length === 0) {
          this.element = 'menu__item';
          element.classList.add(this.element);
        } else {
          this.classes.forEach(function (classname) {
            return element.classList.add(classname);
          });
        }

        element.innerHTML = "\n        <img src=".concat(this.src, " alt=").concat(this.alt, " />\n        <h3 class=\"menu__item-subtitle\">").concat(this.title, "</h3>\n        <div class=\"menu__item-descr\">").concat(this.descr, "</div>\n        <div class=\"menu__item-divider\"></div>\n        <div class=\"menu__item-price\">\n          <div class=\"menu__item-cost\">Price:</div>\n          <div class=\"menu__item-total\"><span>").concat(this.price, "</span> uzs/month</div>\n        </div>\n      ");
        this.parent.append(element);
      }
    }]);

    return MenuCard;
  }();

  new MenuCard('img/tabs/1.png', 'usual', 'Plan "Usual"', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.', 10, '.menu .container').render();
  new MenuCard('img/tabs/2.jpg', 'plan', 'Plan “Premium”', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.', 20, '.menu .container', 'menu__item').render();
  new MenuCard('img/tabs/3.jpg', 'vip', 'Plan VIP', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit nesciunt facere, sequi exercitationem praesentium ab cupiditatebeatae debitis perspiciatis itaque quaerat id modi corporis delectus ratione nobis harum voluptatum in.', 30, '.menu .container', 'menu__item').render();
});