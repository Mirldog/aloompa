import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";
import { AppType } from "./App";
import data from "../../data.json";
import { StageType } from "./Stage";

export const EventType: any = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    appId: {
      type: GraphQLNonNull(GraphQLString),
    },
    app: {
      type: GraphQLNonNull(AppType),
      resolve: (event) => {
        return data.apps.find((app) => app.id === event.appId);
      },
    },
    stageId: {
      type: GraphQLNonNull(GraphQLString),
    },
    stage: {
      type: GraphQLNonNull(StageType),
      resolve: (event) => {
        return data.stages.find((stage) => stage.id === event.stageId);
      },
    },
    description: {
      type: GraphQLNonNull(GraphQLString),
    },
    image: {
      type: GraphQLNonNull(GraphQLString),
    },
    startsAt: {
      type: GraphQLNonNull(GraphQLString),
    },
    endsAt: {
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});
