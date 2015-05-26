/**
 * Created by Tally on 26/05/2015.
 */


'use strict';

angular.module('morffy').factory('DiagramSvc', function ($log, $meteor, $rootScope) {

    var diagramsCollection = $meteor.collection(DiagramsModel).subscribe('diagrams');

    return {

        getAll: function (){
          return diagramsCollection;
        },

        get: function (dgId) {
            return $meteor.object (DiagramsModel, new Mongo.ObjectID( dgId));
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

        update: function (dg) {
            dg.save ();
        },

        remove: function (dgId) {
            DiagramsModel.remove (dgId);

        }

    };

});
