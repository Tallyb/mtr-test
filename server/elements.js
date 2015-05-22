/**
 * Created by Tally on 22/05/2015.
 */

Meteor.publish('elements', function(diagramId){
    return ElementsModel.find({diagramId: Meteor.ObjectID (diagramId)});
});
