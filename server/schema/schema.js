const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
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
    {id: '1', title: 'Hiking', description: 'In the hills', userId: '1'},
    {id: '2', title: 'Snowboarding', description: 'In icy hills', userId: '4'},
    {id: '3', title: 'Biking', description: 'Feet on the pedal', userId: '5'},
    {id: '4', title: 'Cooking', description: 'Aromatique', userId: '1'},
    {id: '5', title: 'Running', description: 'Run club', userId: '5'},
]
const postsData = [
    {id: '1', comment: 'Post #1', userId: '1'},
    {id: '2', comment: 'Post #2', userId: '4'},
    {id: '3', comment: 'Post #3', userId: '5'},
    {id: '4', comment: 'Post #4', userId: '1'},
    {id: '5', comment: 'Post #5', userId: '5'},
]

// create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, {userId: parent.id})
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {userId: parent.id})
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation for hobby',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId})
            }
        }
    })
})

const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Documentation for post',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(usersData, {id: parent.userId})
            }
        }
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
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return usersData
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
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData
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
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postsData
            }
        },
    }
})

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                profession: {type: GraphQLString},
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession,
                }
                return user
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID},
                comment: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId,
                }
                return post
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId,
                }
                return hobby
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

// GraphiQL queries
/**
{
  user(id: "5") {
    age
    name
    profession
    posts {
      comment
    }
    hobbies {
      title
    }
  }
  users {
    name
    age
    profession
    hobbies {
      description
    }
    posts {
      comment
    }
  }
  hobby(id: "5") {
    title
    user {
      name
    }
  }
  post(id: "1") {
    comment
    user {
      name
    }
  }
}
*/

// GraphQL mutation
/**
mutation {
  createUser(name: "Apollo", age: 27, profession: "Very smart person") {
    id
    name
    age
    profession
    hobbies {
      id
    }
  }
  createPost(comment: "Nouvelle post", userId: "2") {
    id
    comment
    user {
      name
    }
  }
  createHobby(title: "Swimming", description: "In the deep ocean", userId: "1") {
    id
    title
    description
    user {
      name
    }
  }
}
 */