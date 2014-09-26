PlaceholderPollyfill = require "./placeholder"

pollyfills = {
}

if platform?.name is "IE" and process.browser
  pollyfills.placeholder = PlaceholderPollyfill

module.exports = pollyfills
