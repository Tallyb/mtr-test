/**
 * Created by Tally on 21/05/2015.
 */

/**
 * Created by Tally on 12/05/2015.
 */
'use strict';

angular.module('morffy').controller('TimelineCtrl1', function TimelineCtrl ($stateParams, TimelineSvc, $mdDialog, $log, $scope, $state ) {

    var vm = this;
    var dgId = $stateParams.diagramId;
    var init = function (dgId){
        TimelineSvc.get(dgId).then (function (response){
            vm.timeline = response;
        });
    };

    init (dgId);

    $scope.$on ("DIAGRAM_CHANGED", function (event, data) {
        init (dgId);
    } );

    vm.selectInterval = function (offset) {
        if (vm.timeline[offset].isMS()) {
            TimelineSvc.setSelectedInterval (offset);
        } else {
            milestoneEdit ({diagram_id: TimelineSvc.diagramId, offset: offset});
        }
    };

    vm.intervalWidth = function (){return TimelineSvc.getIntervalWidth();};

    vm.updateMilestone = function (ms) {
        milestoneEdit (ms);
    };

    vm.selectCompare = function (offset) {
        TimelineSvc.selectedCompare = offset;
    };

    vm.isSelectedInterval = function (offset){
        return  TimelineSvc.selectedInterval === offset;
    };
    vm.isSelectedCompare = function (offset){
        return  TimelineSvc.selectedCompare === offset;
    };

    vm.msOnDrop = function (newOffset,oldOffset){ // moving the milestone
        $log.log ('moving from '+ oldOffset + 'to '+ newOffset);
        TimelineSvc.moveMS(oldOffset, newOffset).then(function (respone) {
            vm.timeline= respone;
        });
    };

    vm.msDropValidate = function (newOffset, oldOffset){ // validating where the MS can move
        return TimelineSvc.validateMSMove (newOffset, oldOffset);
    };

    //  modal window for milestone editing
    var milestoneEdit = function (milestone) {
        var settingsModal = $mdDialog.show({
            templateUrl: 'diagram/timeline/milestone.edit.tpl.html',
            controller: 'MilestoneEditCtrl',
            controllerAs: 'MilestoneEditCtrl',
            resolve: {
                milestone: function () {return milestone;}
            }
        });
        settingsModal.result.then(function oked(milestone, del) {
            // on OK on modal -  update / create / delete the milestone
            var deferred;
            if (_.isUndefined(milestone.id)) {
                deferred = TimelineSvc.addMS (milestone);
            } else if (del === true) {
                deferred = TimelineSvc.removeMS(milestone.id);
            } else {
                deferred = TimelineSvc.updateMS(milestone);
            }
            deferred.then (function (response){
                vm.timeline = response;
                vm.selectInterval (del ? 0 : milestone.offset);
            }, function (error) {$log.log ('error in milestone '+ error); });
        }, function cancelled() { //do nothing on cancel
            $log.info('Milestone editing dismissed at: ' + new Date());
        });
    };
});

angular.module('morffy').controller('MilestoneEditCtrl', function MilestoneEditCtrl ($modalInstance, milestone) {

    var vm = this;
    var dg = milestone.diagram_id;

    vm.milestone = milestone;

    vm.del = function (){
        $modalInstance.close(vm.milestone, true );
    };
    vm.ok = function () {
        $modalInstance.close(vm.milestone);
    };

    vm.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});

