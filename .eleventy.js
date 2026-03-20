module.exports = function (eleventyConfig) {
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/sitemap.xml": "sitemap.xml" });

  // Copy admin panel to output
  eleventyConfig.addPassthroughCopy("admin");

  return {
    dir: {
      input: "src",
      output: "_site",
      data: "_data",
    },
  };
};
