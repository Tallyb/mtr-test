/**
 * Created by Tally on 22/05/2015.
 */

Meteor.publish("diagrams", function () {
    return DiagramsModel.find({
        $or:[
            {$and:[
                {"public": true},
                {"public": {$exists: true}}
            ]},
            {$and:[
                {userId: this.userId},
                {userId: {$exists: true}}
            ]}
        ]});
});

