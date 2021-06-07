// Filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");

module.exports = (config) => {
  // Returns a collection with all entries of the gospel in reverse date oder
  config.addCollection("evangelios", (collection) => {
    return [...collection.getFilteredByGlob("./src/evangelios/*.md")].reverse();
  });

  // Add filters
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

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
