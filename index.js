const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql` 
    scalar Date  

    """
    An object that describes the characteristics of a ski day
    """
    type SkiDay {
        "A ski days's unique identifier"
        id: ID!
        "The date the ski day occurred"
        date: Date!
        "The location where ski day occurred"
        mountain: String!
        conditions: Conditions
    }

    enum Conditions {
        Powder
        Heavy
        ICE
        Thin
    }

    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    input AddDayInput {
        date: String!
        mountain: String!
        conditions: Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int!
        totalAfter: Int!

    }

    type Mutation {
        addDay(input: AddDayInput!): SkiDay
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: SkiDay!
    }
`;

const mocks = {
    Date: () => "1/2/2025",
    String: () => "Cool Data",
    Query: () => ({
        allDays: () => new MockList([8])
    })
}
const server = new ApolloServer({
    typeDefs,
    mocks
});

server
    .listen()
    .then(({url}) => 
    console.log(`sever running at ${url}`)
    );