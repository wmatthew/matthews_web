const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({"root": "/"});
  eleventyConfig.addPassthroughCopy("img");

  (async () => {
    let imgUrl = "img/castle-sq.jpg";
    let imgOptions = {
      widths: [100, 200],
      formats: ["jpeg"],
      filenameFormat: function (id, src, width, format, options) {
        // id: hash of the original image
        // src: original image path
        // width: current width in px
        // format: current file format
        // options: set of options passed to the Image call
        slug = src.split(".")[0].split("/").pop();
        return `${slug}-${width}.${format}`;    
      },
      outputDir: "../docs/img/"
    };

    let stats = await Image(imgUrl, imgOptions);
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
