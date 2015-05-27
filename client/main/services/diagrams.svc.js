/**
 * Created by Tally on 27/05/2015.
 */
'use strict';

angular.module('morffy').factory('DiagramsSvc', function ($log, $meteor, $rootScope) {

    var diagramsCollection = $meteor.collection(DiagramsModel).subscribe('diagrams');

    return {

        get: function () {
            return diagramsCollection;
        },
        add: function (diagram) {
            diagram.userId = $rootScope.currentUser._id;
            var milestone = {
                offset: 0,
                code: "BL"
            };
            milestone._id = new Mongo.ObjectID();
            diagram.milestones = [milestone];

            return diagramsCollection.save(diagram);
        },
        remove: function (dgId) {
            diagramsCollection.remove (dgId);
        }

    };



});