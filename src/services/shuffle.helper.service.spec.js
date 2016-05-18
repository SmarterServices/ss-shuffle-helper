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
            console.log(indexArray);
            console.log(shuffledArray);
            expect(shuffledArray.toString()).not.toBe(indexArray.toString());
        });

    });
});
