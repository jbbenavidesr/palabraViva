// Filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const CleanCSS = require("clean-css");

module.exports = (config) => {
    // Returns a collection with all entries of the gospel in reverse date oder
    config.addCollection("evangelios", (collection) => {
        return [
            ...collection.getFilteredByGlob("./src/evangelios/*.md"),
        ].reverse();
    });

    // Add filters
    config.addFilter("dateFilter", dateFilter);
    config.addFilter("w3DateFilter", w3DateFilter);
    config.addFilter("cssmin", function (code) {
        return new CleanCSS({}).minify(code).styles;
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
