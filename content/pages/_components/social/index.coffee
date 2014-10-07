views = require "mojo-views"
superagent = require "superagent"

class SocialButtonsView extends views.Base
  paper: require("./index.pc")
  didRender: () ->
    return unless process.browser

    @_loadTwitterFollowers()
    @_loadGithubInfo()

  _loadTwitterFollowers: () ->
    $.ajax 
      dataType: "jsonp",
      url: "https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=mojoframework",
      success: (data) =>
        @set "followers", data?[0]?.formatted_followers_count
    
  _loadGithubInfo: () ->  
    $.ajax 
      dataType: "jsonp",
      url: "https://api.github.com/repos/mojo-js/mojo.js",
      success: (data) =>
        @set "starGazers", data?.data?.watchers
        @set "forks", data?.data?.forks



module.exports = SocialButtonsView