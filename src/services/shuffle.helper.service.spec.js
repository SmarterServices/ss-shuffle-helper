describe('shuffleHelper', function() {

    beforeEach(module('ss.shuffle'));

    beforeEach(inject(function(_shuffleHelper_) {
        shuffleHelperService = _shuffleHelper_;
    }));
    var shuffleHelperService;
    var indexArray = [1,2,3,4,5];
    var shuffledArray;
    describe('when i shuffle an array', function() {

        it('should shuffle the array', function() {
            shuffledArray = shuffleHelperService.shuffle(angular.copy(indexArray));
            expect(shuffledArray.toString()).not.toBe(indexArray.toString());
        });

        it('should keep fixed index in proper position in the array', function() {
            var fixedIndex = 2;
            var fixedIndexArray = [];
            fixedIndexArray.push(fixedIndex);
            shuffledArray = shuffleHelperService.shuffleWithFixedItems(angular.copy(indexArray),fixedIndexArray);
            expect(shuffledArray.toString()).not.toBe(indexArray.toString());
            expect(shuffledArray[fixedIndex]).toEqual(indexArray[2]);
        });

    });
});
