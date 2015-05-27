/**
 * Created by Tally on 26/05/2015.
 */


'use strict';

angular.module('morffy').factory('DiagramSvc', function ($log, $meteor, $rootScope) {

    return {

        diagramObject: $meteor.object (DiagramsModel, new Mongo.ObjectID(Session.get ('currentDiagramId'))),

        diagramElements: $meteor.subscribe('diagramElements', new Mongo.ObjectID (Session.get ('currentDiagramId'))),

        update: function (dg) {
            $meteor.collection(DiagramsModel).save (dg);
            $log.info ('saving diagram'+dg);
        }


    };

});
