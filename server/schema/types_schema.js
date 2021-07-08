const {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} = require('graphql')

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: "Description for RootQueryType",
    fields: {

    }
})

// Scalar types
/**
 * String = GraphQLString
 * Int
 * Float
 * Boolean
 * ID
 */

const Person = new GraphQLObjectType({
    name: "Person",
    description: "Represents a person type",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat}
    })
})

module.exports = new GraphQLSchema({
    query: RootQuery
})