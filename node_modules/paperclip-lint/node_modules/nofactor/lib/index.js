module.exports = {
  string : require("./string"),
  dom    : require("./dom")
};

module.exports["default"] = typeof window !== "undefined" ? module.exports.dom : module.exports.string;