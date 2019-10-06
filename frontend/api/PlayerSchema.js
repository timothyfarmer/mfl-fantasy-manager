import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Player {
    players: String
    details: Boolean,
    since: Date
  }
  type Query {
    players(players: String, since: DateString): Player
  }
`;