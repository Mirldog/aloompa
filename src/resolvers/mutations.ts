import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
} from "graphql";
import { AppType, EventType, StageType } from "../entities";
import { generateId } from "../helpers/generateId";
import data from "../../data.json";
const fs = require("fs");

export const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addApp: {
      type: AppType,
      description: "Add an app",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const id: string = args.id ? args.id : generateId();
        const app: any = { id, name: args.name };
        data.apps.push(app);
        await fs.writeFileSync(
          "./data.json",
          JSON.stringify(data),
          (error: any) => {
            if (error) console.error(error);
          }
        );
        return app;
      },
    },
    deleteApp: {
      type: GraphQLBoolean,
      description: "Delete an app",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const idx = data.apps.findIndex((app) => app.id === args.id);

        if (idx >= 0) {
          data.apps.splice(idx, 1);

          await fs.writeFileSync(
            "./data.json",
            JSON.stringify(data),
            (error: any) => {
              if (error) console.error(error);
            }
          );

          return true;
        }

        return false;
      },
    },
    updateApp: {
      type: AppType,
      description: "Update an App",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const idx = data.apps.findIndex((app) => app.id === args.id);
        if (idx >= 0) {
          const app: any = { id: args.id, name: args.name };
          data.apps[idx] = app;
          await fs.writeFileSync(
            "./data.json",
            JSON.stringify(data),
            (error: any) => {
              if (error) console.error(error);
            }
          );
          return app;
        }
      },
    },
    addStage: {
      type: StageType,
      description: "Add a stage",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent: any, args: any) => {
        const id = args.id ? args.id : generateId();
        const stage = { id, name: args.name };
        data.stages.push(stage);
        await fs.writeFileSync(
          "./data.json",
          JSON.stringify(data),
          (error: any) => {
            if (error) console.error(error);
          }
        );
        return stage;
      },
    },
    deleteStage: {
      type: GraphQLBoolean,
      description: "Delete a stage",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent: any, args: any) => {
        const idx = data.stages.findIndex((stage) => stage.id === args.id);

        if (idx >= 0) {
          data.stages.splice(idx, 1);

          await fs.writeFileSync(
            "./data.json",
            JSON.stringify(data),
            (error: any) => {
              if (error) console.error(error);
            }
          );

          return true;
        }

        return false;
      },
      updateStage: {
        type: AppType,
        description: "Update an App",
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
          name: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async (parent: any, args: any) => {
          const idx = data.stages.findIndex((stage) => stage.id === args.id);
          if (idx >= 0) {
            const stage: any = { id: args.id, name: args.name };
            data.stages[idx] = stage;
            await fs.writeFileSync(
              "./data.json",
              JSON.stringify(data),
              (error: any) => {
                if (error) console.error(error);
              }
            );
            return stage;
          }
        },
      },
    },
    addEvent: {
      type: EventType,
      description: "Add an Event",
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLNonNull(GraphQLString) },
        appId: { type: GraphQLNonNull(GraphQLString) },
        stageId: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        startsAt: { type: GraphQLNonNull(GraphQLInt) },
        endsAt: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: async (parent: any, args: any) => {
        const id = args.id ? args.id : generateId();
        const event: any = {
          id,
          name: args.name,
          appId: args.appId,
          stage: args.stageId,
          description: args.description,
          image: args.image,
          startsAt: args.startsAt,
          endsAt: args.endsAt,
        };
        data.events.push(event);
        await fs.writeFileSync(
          "./data.json",
          JSON.stringify(data),
          (error: any) => {
            if (error) console.error(error);
          }
        );
        return event;
      },
    },
    deleteEvent: {
      type: EventType,
      description: "Delete an Event",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent: any, args: any) => {
        const idx = data.events.findIndex((event) => event.id === args.id);

        if (idx >= 0) {
          data.stages.splice(idx, 1);

          await fs.writeFileSync(
            "./data.json",
            JSON.stringify(data),
            (error: any) => {
              if (error) console.error(error);
            }
          );

          return true;
        }

        return false;
      },
    },
    updateEvent: {
      type: EventType,
      description: "Update an Event",
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        appId: { type: GraphQLString },
        stageId: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        startsAt: { type: GraphQLInt },
        endsAt: { type: GraphQLInt },
      },
      resolve: async (parent: any, args: any) => {
        const idx = data.events.findIndex((event) => event.id === args.id);
        if (idx >= 0) {
          const oldEvent = data.events[idx];
          const event: any = {
            id: args.id,
            name: args.name ? args.name : oldEvent.name,
            appId: args.appId ? args.appId : oldEvent.appId,
            stageId: args.stageId ? args.stageId : oldEvent.stageId,
            description: args.description
              ? args.description
              : oldEvent.description,
            image: args.image ? args.image : oldEvent.image,
            startsAt: args.startsAt ? args.startsAt : oldEvent.startsAt,
            endsAt: args.endsAt ? args.endsAt : oldEvent.endsAt,
          };
          data.events[idx] = event;
          await fs.writeFileSync(
            "./data.json",
            JSON.stringify(data),
            (error: any) => {
              if (error) console.error(error);
            }
          );
          return event;
        }
      },
    },
  }),
});
