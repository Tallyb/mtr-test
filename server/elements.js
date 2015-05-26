/**
 * Created by Tally on 22/05/2015.
 */

Meteor.publish('diagramElements', function(diagramId){
    return ElementsModel.find({diagramId: Meteor.ObjectID});
});
