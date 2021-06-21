// Filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const CleanCSS = require("clean-css");

module.exports = (config) => {

  const now = new Date();
  // Returns a collection with all entries of the gospel in reverse date oder
  const livePosts = post => post.date.setUTCHours(0,0,0,0) <= now && !post.data.draft;
  config.addCollection("evangelios", (collection) => {
    return [...collection.getFilteredByGlob("./src/evangelios/*.md").filter(livePosts)].reverse();
  });

  // Add filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);
  config.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // Add passthrough of the fonts and CMS Settings
  config.addPassthroughCopy("src/fonts");
  config.addPassthroughCopy("src/admin");
  config.addPassthroughCopy("src/images");

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
      input: "src",
      output: "dist",
    },
  };
};
