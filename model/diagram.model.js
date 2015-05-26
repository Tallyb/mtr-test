/**
 * Created by Tally on 22/05/2015.
 */

DiagramsModel = new Mongo.Collection("diagrams" ,{idGeneration: 'MONGO'});

Meteor.methods({
    createDiagram: function (diagram) {
        diagram.userId = this.userId;
        var milestone = {
            offset: 0,
            code: "BL"
        };
        milestone._id = new Mongo.ObjectID();
        diagram.milestones = [milestone];
        return DiagramsModel.insert(diagram);
    },
    updateDiagram:function (diagram, oldDiagram){
         DiagramsModel.update ({_id: diagram._id},diagram) ;
    },

    addMS: function (diagram, milestone) {
        check (milestone, {
            offset: Number,
            code: String
        });

        if (!diagram)
            throw new Meteor.Error(404, "No such diagram");
        if (milestone.offset > diagram.totalIntervals) {
            throw new Meteor.Error (400,'milestone is beyond last interval');
        }
        if ( _.findIndex (diagram.milestones,  {offset: milestone.offset})  > -1 ) {
            throw new Meteor.Error (400,'There is already a milestone in this offset');
        }
        if (_.findIndex (diagram.milestones,  {code: milestone.code}) > -1) {
            throw new Meteor.Error (400,'There is already a milestone with this code');
        }
        milestone._id = new Meteor.ObjectId();
        diagram.milestones.push (milestone);
        DiagramsModel.update (diagram, function (err, res){
            if (err) {return err};
            return res;
        });
    },

    removeMS: function (diagramId, milestoneId) {
        //ToDo update all elements that have the MS as start or end
    },

    updateMS: function (diagram, milestone) {
        var i;
        if (!diagram)
            throw new Meteor.Error(404, "No such diagram");
        if (milestone.offset > diagram.totalIntervals) {
            throw new Meteor.Error (400,'milestone is beyond last interval');
        }
        i = _.find (diagram.milestones, {offset: milestone.offset});
        if ( i && i._id !== milestone._id ) {
            throw new Meteor.Error (400,'There is already a milestone in this offset');
        }
        i = _.find (diagram.milestones, {code: milestone.code});
        if (i && i._id !== milestone._id ) {
            throw new Meteor.Error (400,'There is already a milestone with this code');
        }
        i = _findIndex (diagram.milestones);
        diagram.milestones[i] = milestone;
        DiagramsModel.update ({_id: diagram._id}, {$set: diagram}, function (err, res){
            if (!err) return res;
        });
        return false;
    }
});