import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { EventType } from "./Event";
import data from "../../data.json";
import { StageType } from "./Stage";

export const AppType: any = new GraphQLObjectType({
  name: "App",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    events: {
      type: GraphQLList(EventType),
      resolve: (app) => {
        return data.events.filter((event) => event.appId === app.id);
      },
    },
    stages: {
      type: GraphQLList(StageType),
      resolve: (app) => {
        const stageIds = data.events
          .filter((event) => event.appId === app.id)
          .map((e) => e.stageId);
        const stages = data.stages.filter((s) => stageIds.indexOf(s.id) >= 0);
        return stages;
      },
    },
  }),
});
