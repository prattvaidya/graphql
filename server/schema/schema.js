const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = require('graphql')

// create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

// Root query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description for RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { 
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // we resolve with data
                // get and return data from a data-source
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})