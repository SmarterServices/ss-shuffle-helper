(function() {
    'use strict';
    angular.module('ss.shuffle')
        .service('shuffleHelper', shuffleHelper);

    function shuffleHelper() {

        var service = {
            shuffleWithFixedItems: shuffleWithFixedItems,
            shuffle : shuffle
        };
        return service;

        function shuffleWithFixedItems(array, fixedIndices) {

            var m = array.length, t, i;
            var fixedIndexRemaining = fixedIndices.length;
            var isCurrentIndexFixedIndex = -1;
            var maxRandomGeneration = 50;

            // While there remain elements to shuffle…
            while (m) {

                //find if m in fixedIndices
                isCurrentIndexFixedIndex = -1;
                var tempM = m;
                tempM--;
                if (fixedIndexRemaining) {
                    for(var j = 0; j < fixedIndices.length; j++) {
                        if (tempM === fixedIndices[j]) {
                            isCurrentIndexFixedIndex = j;
                            break;
                        }
                    }
                    //isCurrentIndexFixedIndex = lodash.indexOf(fixedIndices, m);
                    //fixedIndexRemaining--;
                }
                //if true
                if (!isCurrentIndexFixedIndex) {
                    fixedIndexRemaining--;
                    m--;
                } else {
                    isCurrentIndexFixedIndex = -1;
                    maxRandomGeneration = 50;
                    if (fixedIndices.length > 0) {
                        while(maxRandomGeneration-- && isCurrentIndexFixedIndex === -1) {
                            for(var j = 0; j < fixedIndices.length; j++) {
                                // Pick a remaining element…
                                i = Math.floor(Math.random() * m);
                                if (i === fixedIndices[j]) {
                                    isCurrentIndexFixedIndex = j;
                                    break;
                                }
                            }
                        }
                        //isCurrentIndexFixedIndex = lodash.indexOf(fixedIndices, m);
                        //fixedIndexRemaining--;
                    } else {
                        i = Math.floor(Math.random() * m);
                    }
                    m--;
                    // And swap it with the current element.
                    if (isCurrentIndexFixedIndex === -1) {
                        t = array[m];
                        array[m] = array[i];
                        array[i] = t;
                    }
                }
            }
            return array;

        };

        function shuffle(array) {
            return shuffleWithFixedItems(array, []);
        }
    }
})();
