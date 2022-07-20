import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { EventType } from "./Event";
import data from "../../data.json";

export const StageType: any = new GraphQLObjectType({
  name: "Stage",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    events: {
      type: GraphQLList(EventType),
      resolve: (stage) => {
        return data.events.filter((e) => e.stageId === stage.id);
      },
    },
  }),
});
