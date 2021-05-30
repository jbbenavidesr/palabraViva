module.exports = (config) => {
  // Returns a collection with all entries of the gospel in reverse date oder
  config.addCollection("evangelios", (collection) => {
    return [...collection.getFilteredByGlob("./src/evangelios/*.md")].reverse();
  });

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
