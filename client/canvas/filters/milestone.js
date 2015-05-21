/**
 * Created by Tally on 21/05/2015.
 */

angular.module ('morffy.canvas').filter('showOnMilestone', function () {
    // show the elements on the selected and compared intervals
    return function (elements, selected, compared ) {
        return _.filter(elements, function (e){
            return e.show(selected, compared) ;
        });
    };
});

angular.module ('morffy.canvas').filter('isOnMilestone', function () {
    return function (elements, offset) {
        return _.filter(elements, function (e){
            return e.isOnOffset(offset);
        });
    };
});