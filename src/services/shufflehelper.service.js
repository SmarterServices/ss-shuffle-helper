(function () {
  'use strict';
  angular.module('ss.shuffle')
    .service('shuffleHelper', shuffleHelper);

  function shuffleHelper() {

    var service = {
      shuffleWithFixedItems: shuffleWithFixedItems,
      shuffle: shuffle,
      randomSelect: randomSelect
    };
    return service;

    function shuffleWithFixedItems(array, fixedIndices) {
      var arrayLength = array.length,
        maxRandomGenerationCount = 50,
        currentIndex,
        isCurrentIndexFixed,
        randomIndex,
        randomGenerationCount,
        isRandomIndexFixed,
        tempItem;

      // loop for each item in the array and try to find another index to replace with this index item
      for (currentIndex = 0; currentIndex < arrayLength; currentIndex++) {

        isCurrentIndexFixed = false;

        if (fixedIndices && Array.isArray(fixedIndices) && fixedIndices.length > 0) {
          isCurrentIndexFixed = fixedIndices.some(function (fixedIndexItem) {
            return fixedIndexItem === currentIndex;
          });
        }

        if (!isCurrentIndexFixed) {
          randomGenerationCount = maxRandomGenerationCount;

          // only repeat for a maximum of 50 times in case of no new index is found.
          // Otherwise in some cases it will fall in a while loop
          while (randomGenerationCount-- > 0) {

            // create a random index
            randomIndex = Math.floor((Math.random() * arrayLength));

            // check whether the generated random index is fixed
            isRandomIndexFixed = fixedIndices.some(function (fixedIndexItem) {
              return fixedIndexItem === randomIndex;
            });

            // if the random index is not the current index and
            // the random index is not a fixed index, then use it for swapping
            if (randomIndex !== currentIndex && !isRandomIndexFixed) {

              // we found a new index to swap with currentIndex
              tempItem = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = tempItem;

              break;
            }
          }
        }
      }

      return array;
    }

    function shuffle(array) {
      return shuffleWithFixedItems(array, []);
    }

    function randomSelect(array, numSelect) {
      var result = shuffleWithFixedItems(array, []).splice(0, numSelect);
      return result;
    }
  }
})();
