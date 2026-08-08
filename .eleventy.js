module.exports = function (eleventyConfig) {
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Copy admin panel to output
  eleventyConfig.addPassthroughCopy("admin");

  // Insights collection — newest first. When two items share a date, the
  // optional "order" field breaks the tie (lower shows first); otherwise
  // date alone decides, so genuinely new posts still sort to the top.
  eleventyConfig.addCollection("insights", function (collectionApi) {
    return collectionApi.getFilteredByTag("insights").sort(function (a, b) {
      var dateDiff = b.date - a.date;
      if (dateDiff !== 0) return dateDiff;

      var orderA = a.data.order != null ? a.data.order : Infinity;
      var orderB = b.data.order != null ? b.data.order : Infinity;
      return orderA - orderB;
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
