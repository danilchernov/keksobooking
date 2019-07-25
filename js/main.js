'use strict';

/* DOM  */
var map = document.querySelector('.map');

var mapPins = document.querySelector('.map__pins');

var pin = document.getElementById('pin')
          .content
          .querySelector('.map__pin');

/* Fake Data */
var fakeTypes = ['palace', 'flat', 'house', 'bungalo'];

/* Utils */

function pickRandom(arr) {
  return Math.floor(Math.random() * arr.length);
}

function generateFakeData(amount) {
  for (var i = 1; i <= amount; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: fakeTypes[pickRandom(fakeTypes)]
      },
      location: {
        x: Math.floor(Math.random() * map.clientWidth),
        y: Math.floor(Math.random() * 500) + 130 // from 130 to 630
      }
    };
    ads.push(ad);
  }

  return ads;
}

var ads = [];
// generateFakeData(8);

function renderPins(ad) {
  var pinElement = pin.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElementImg.src = ad.author.avatar;
  pinElementImg.alt = ad.offer;
  pinElement.setAttribute('style', 'top: ' + ad.location.y + 'px;' + 'left: ' + ad.location.x + 'px');

  return pinElement;
}

function createFragment() {
  var fragment = document.createDocumentFragment();

  for (var i = 0, length = ads.length; i < length; i++) {
    fragment.appendChild(renderPins(ads[i]));
  }

  return fragment;
}

// mapPins.appendChild(createFragment());


/*
  ! Module4-task1
*/

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('.ad-form fieldset');

var mapFiltersForm = document.querySelector('.map__filters');
var mapFiltersSelects = mapFiltersForm.querySelectorAll('.map__filter');
var mapFeatures = mapFiltersForm.querySelector('.map__features');
var isActive = true;

var activeApp = function () {
  isActive = true;
  if (isActive) {
    map.classList.remove('map--faded');

    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (item) {
      item.removeAttribute('disabled');
    });

    mapFiltersForm.classList.remove('map__filters--disabled');
    mapFiltersSelects.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    mapFeatures.removeAttribute('disabled');

    mapPinMain.removeEventListener('click', activeApp);
  }
};

mapPinMain.addEventListener('click', activeApp);

var typeSelect = document.getElementById('type');
var priceInput = document.getElementById('price');

var onTypeSelectChange = function (evt) {
  var type = evt.target.value;

  switch (type) {
    case 'bungalo':
      priceInput.setAttribute('min', '0');
      priceInput.setAttribute('placeholder', '0');
      break;
    case 'flat':
      priceInput.setAttribute('min', '1000');
      priceInput.setAttribute('placeholder', '1000');
      break;
    case 'house':
      priceInput.setAttribute('min', '5000');
      priceInput.setAttribute('placeholder', '5000');
      break;
    case 'palace':
      priceInput.setAttribute('min', '10000');
      priceInput.setAttribute('placeholder', '10000');
      break;
  }
};

typeSelect.addEventListener('change', onTypeSelectChange);


var timeInSelect = document.getElementById('timein');
var timeOutSelect = document.getElementById('timeout');

var onTimeInChange = function () {
  timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
};

var onTimeOutChange = function () {
  timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
};


timeInSelect.addEventListener('change', onTimeInChange);
timeOutSelect.addEventListener('change', onTimeOutChange);
