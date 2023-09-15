const CleanCSS = require("clean-css");
const { minify } = require("terser");

const setupJsminConfig = async function (code, callback) {
  try {
    const minified = await minify(code);
    callback(null, minified.code);
  } catch (err) {
    console.error("Terser error: ", err);
    // Fail gracefully.
    callback(null, code);
  }
};

const copyFilesConfig = {
  "node_modules/modern-normalize/modern-normalize.css":
    "assets/styles/modern-normalize.css",

  "src/assets": `assets`,
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter(
    "cssmin",
    (code) => new CleanCSS({}).minify(code).styles
  );

  eleventyConfig.addNunjucksAsyncFilter("jsmin", setupJsminConfig);
  eleventyConfig.addPassthroughCopy(copyFilesConfig);

  eleventyConfig.addWatchTarget("./src/assets");

  return {
    dir: {
      input: "src",
    },
    templateFormats: ["html", "md"],
  };
};
