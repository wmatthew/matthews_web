const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({"root": "/"});
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("img");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false, // see https://www.11ty.dev/docs/languages/liquid/ for details
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });

  // Universal Shortcodes are added to:
  // * Liquid
  // * Nunjucks
  // * Handlebars
  // * JavaScript
  eleventyConfig.addShortcode("sandboxSum", function (firstNum, secondNum) { return firstNum + " plus " + secondNum + " is " + (parseInt(firstNum) + parseInt(secondNum)); });
  eleventyConfig.addFilter("makeUppercase", function (value) { return value.toUpperCase(); });

  return {
    dir: {
      input: ".",
      output: "../docs"
    }    
  }
};
