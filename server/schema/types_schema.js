const {
    GraphQLObjectType, 
    GraphQLSchema, 
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull
} = require('graphql')

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
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: GraphQLInt},
        isMarried: {type: GraphQLBoolean},
        gpa: {type: GraphQLFloat}
    })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: "Description for RootQueryType",
    fields: {
        person: {
            type: Person,
            resolve(parent, args) {
                let personObj = {
                    name: "Antonio",
                    age: 34,
                    isMarried: true,
                    gpa: 4.01
                }
                return personObj
            }
        }
    }
})



module.exports = new GraphQLSchema({
    query: RootQuery
})