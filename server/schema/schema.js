const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = require('graphql')
var _ = require('lodash')

const usersData = [
    {id: '1', name: 'Bond', age: 26, profession: 'Detective'},
    {id: '2', name: 'Anna', age: 36, profession: 'Banker'},
    {id: '3', name: 'Bella', age: 16, profession: 'Model'},
    {id: '4', name: 'Gina', age: 23, profession: 'Programmer'},
    {id: '5', name: 'Georgina', age: 13, profession: 'Student'},
]
const hobbiesData = [
    {id: '1', title: 'Hiking', description: 'In the hills'},
    {id: '2', title: 'Snowboarding', description: 'In icy hills'},
    {id: '3', title: 'Biking', description: 'Feet on the pedal'},
    {id: '4', title: 'Cooking', description: 'Aromatique'},
    {id: '5', title: 'Running', description: 'Run club'},
]
const postsData = [
    {id: '1', comment: 'Post #1'},
    {id: '2', comment: 'Post #2'},
    {id: '3', comment: 'Post #3'},
    {id: '4', comment: 'Post #4'},
    {id: '5', comment: 'Post #5'},
]

// create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation for hobby',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Documentation for post',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString}
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
        },
        hobby: {
            type: HobbyType,
            args: { 
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // we resolve with data
                // get and return data from a data-source

                return _.find(hobbiesData, { id: args.id})
            }
        },
        post: {
            type: PostType,
            args: { 
                id: {type: GraphQLID}
            },
            resolve(parent, args) {
                // we resolve with data
                // get and return data from a data-source

                return _.find(postsData, { id: args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})