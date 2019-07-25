'use strict';
/* DOM 🌳 */

var map = document.querySelector('.map');
map.classList.remove('map--faded'); // Show map

var pinsArea = map.querySelector('.map__pins');

var pinTemplate = document.getElementById('pin')
  .content
  .querySelector('.map__pin');

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var ads = []; // Array with ads information


/* DOM 🌳 */

/* Utils 🏗 */

var fakeTypes = ['palace', 'flat', 'house', 'bungalo'];

var pickRandom = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

/* Utils 🏗 */

var generateAds = function (amount) {
  for (var i = 1; i <= amount; i++) {
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: fakeTypes[pickRandom(fakeTypes)]
      },
      location: {
        x: Math.floor(Math.random() * map.offsetWidth),
        y: Math.floor(Math.random() * 500) + 130
      }
    };

    ads.push(ad);
  }

  return ads;
};

generateAds(8);

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  /* Coordinates */
  var pinCoordX = 'left:' + (pin.location.x - PIN_WIDTH / 2) + 'px';
  var pinCoordY = 'top:' + (pin.location.y - PIN_HEIGHT) + 'px';

  pinElement.setAttribute('style', pinCoordX + '; ' + pinCoordY);

  /* Setup img attrs */
  pinElementImg.src = pin.author.avatar;
  pinElementImg.alt = pin.offer.type;

  return pinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0, length = ads.length; i < length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}

pinsArea.appendChild(fragment);
