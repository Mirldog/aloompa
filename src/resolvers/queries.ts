import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { AppType, StageType, EventType } from "../entities/index";
import data from "../../data.json";

export const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    app: {
      type: AppType,
      description: "A Single App",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: (parent: any, args: any) => {
        if (args.id) {
          return data.apps.find((app) => app.id === args.id);
        }
        if (args.name) {
          return data.apps.find((app) => app.name === args.name);
        }
      },
    },
    apps: {
      type: new GraphQLList(AppType),
      description: "List of all Apps",
      resolve: () => data.apps,
    },
    stage: {
      type: StageType,
      description: "A Single Stage",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: (parent: any, args: any) => {
        if (args.id) {
          return data.stages.find((stage) => stage.id === args.id);
        }
        if (args.name) {
          return data.stages.find((stage) => stage.name === args.name);
        }
      },
    },
    stages: {
      type: new GraphQLList(StageType),
      description: "List of all Stages",
      resolve: () => data.stages,
    },
    event: {
      type: EventType,
      description: "A Single Event",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: (parent: any, args: any) => {
        if (args.id) {
          return data.events.find((event) => event.id === args.id);
        }
        if (args.name) {
          return data.events.find((event) => event.name === args.name);
        }
      },
    },
    events: {
      type: new GraphQLList(EventType),
      description: "List of all Events",
      resolve: () => data.events,
    },
    eventsAtDate: {
      type: new GraphQLList(EventType),
      description: "List of all Events occurring between two times",
      args: {
        startsAt: { type: GraphQLInt },
        endsAt: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return data.events.filter(
          (event) =>
            event.startsAt >= args.startsAt && event.endsAt <= args.endsAt
        );
      },
    },
  }),
});
