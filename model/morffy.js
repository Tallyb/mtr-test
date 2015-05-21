/**
 * Created by Tally on 12/04/2015.
 */

_ = lodash;

DiagramsModel = new Mongo.Collection("diagrams" ,{idGeneration: 'MONGO'});
ElementsModel = new Mongo.Collection ("elements");