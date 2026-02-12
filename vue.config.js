module.exports = {
    publicPath: '/tutuyoutoo-site/',
    css: {
      loaderOptions: {
        sass: {
          prependData: `
            @import "@/scss/_variables.scss";
            @import "@/scss/_mixins.scss";
            @import "@/scss/_animations.scss";
          `
        }
      }
    }
  };