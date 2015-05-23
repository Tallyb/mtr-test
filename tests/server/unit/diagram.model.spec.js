/**
 * Created by Tally on 22/05/2015.
 */

describe ('Diagram Model', function (){

    var diagramsModel, diagram, milestone, r, e;
    beforeEach (function (){
        diagramsModel = new DiagramsModel;
        diagram = DiagramsModel.find ({_id: ObjectId("552a517176874f9821c80f1a")});
    });

    it('should error on invalid offset', function (){
        milestone = {offset: "ABC", code: "TEST" };
        Meteor.call ('addMS', diagram, function (err, res ){
            e = err;
            r = res;
        });
        expect (e).notToBeFalsey();
        expect (r).toBeUndefined();
    })

});
