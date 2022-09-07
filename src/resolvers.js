const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (parent, args, context, info) => {
      const { dataSources } = context;

      return dataSources.trackAPI.getTracksForHome();
    },
    // get a single track by id, for the Track page
    track: (parent, args, context, info) => {
      const { dataSources } = context;
      const { id } = args;

      return dataSources.trackAPI.getTrack(id);
    }
  },

  Mutation: {
    //increment's a track's numberOfViews property
    incrementTrackViews: async (parent, args, context, info) => {
      try {
        const { id } = args;
        const { dataSources } = context;

        const track = await dataSources.trackAPI.incrementTrackViews(id);

        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${id}`,
          track
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        }
      }
    }
  },

  Track: {
    author: (parent, args, context, info) => {
      const { dataSources } = context;
      const { authorId } = parent;

      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: (parent, args, context, info) => {
      const { id } = parent;
      const { dataSources } = context;

      return dataSources.trackAPI.getTrackModules(id)
    }
  }
};

module.exports = resolvers;