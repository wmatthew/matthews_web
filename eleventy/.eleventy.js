const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const Image = require("@11ty/eleventy-img");
const Hydrator = require("./backendJS/pieceHydrator.js");
const Constraints = require("./backendJS/Constraints.js");
const Connections = require("./backendJS/Connections.js");
const Board = require("./backendJS/Board.js");
const Piece = require("./backendJS/Piece.js");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy({"root": "/"});
  eleventyConfig.addPassthroughCopy("img");

  // Generate thumbnail images
  // TODO: make this a shortcode / filter
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
    //console.log( stats );
  })();

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false, // see https://www.11ty.dev/docs/languages/liquid/ for details
    strictFilters: false, // renamed from `strict_filters` in Eleventy 1.0
  });

  // Universal Shortcodes
  eleventyConfig.addShortcode("sandboxSum", function (firstNum, secondNum) { return firstNum + " plus " + secondNum + " is " + (parseInt(firstNum) + parseInt(secondNum)); }); // example only
  eleventyConfig.addFilter("makeUppercase", function (value) { return value.toUpperCase(); }); // example only
  eleventyConfig.addFilter("hydratePiece", Hydrator.hydrate );
  eleventyConfig.addFilter("hideOneLabels", Hydrator.hideOneLabels );
  eleventyConfig.addFilter("fixCoordinates", Hydrator.fixCoordinates );
  eleventyConfig.addFilter("rotatePiece", Hydrator.rotatePiece ); // TODO: deprecate in favor of transformPiece
  eleventyConfig.addFilter("transformPiece", Piece.transformPiece );
  eleventyConfig.addFilter("stripOuterChars", function (str) { return str.slice(1, -1);  } );
  eleventyConfig.addFilter("setSolutionField", Constraints.setSolutionField );
  eleventyConfig.addFilter("getUrl", Connections.getUrl );
  eleventyConfig.addFilter("getConstraintTemplatesThatUseKey", Connections.getConstraintTemplatesThatUseKey );
  eleventyConfig.addFilter("getThingsThatUsePiece", Connections.getThingsThatUsePiece );
  eleventyConfig.addFilter("getChildConstraints", Connections.getChildConstraints );
  eleventyConfig.addFilter("getThingsThatUseBoard", Connections.getThingsThatUseBoard );
  eleventyConfig.addFilter("groupBoardsByCategory", Board.groupBoardsByCategory );

  return {
    dir: {
      input: ".",
      output: "../docs"
    }    
  }
};
