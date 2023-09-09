const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({"root": "/"});
  eleventyConfig.addPassthroughCopy("img");

  (async () => {
    let url = "img/castle-sq.jpg";
    let stats = await Image(url, {
      widths: [100, 200, 300],
      formats: ["jpeg"]
    });
  
    console.log( stats );
  })();

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
