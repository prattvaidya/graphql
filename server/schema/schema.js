const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = require('graphql')
var _ = require('lodash')

const usersData = [
    {id: '1', name: 'Bond', age: 26},
    {id: '2', name: 'Anna', age: 36},
    {id: '3', name: 'Bella', age: 16},
    {id: '4', name: 'Gina', age: 23},
    {id: '5', name: 'Georgina', age: 13},
]

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

                return _.find(usersData, { id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})