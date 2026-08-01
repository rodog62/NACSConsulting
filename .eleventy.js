module.exports = function (eleventyConfig) {
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Copy admin panel to output
  eleventyConfig.addPassthroughCopy("admin");

  // Insights collection — newest first
  eleventyConfig.addCollection("insights", function (collectionApi) {
    return collectionApi.getFilteredByTag("insights").sort(function (a, b) {
      return b.date - a.date;
    });
  });

  eleventyConfig.addFilter("readableDate", function (date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  });

  eleventyConfig.addFilter("dateXml", function (date) {
    return new Date(date).toISOString();
  });

  eleventyConfig.addFilter("rssDate", function (date) {
    return new Date(date).toUTCString();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
  };
};
