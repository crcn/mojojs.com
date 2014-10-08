glob = require "glob"
marked = require "marked"
fs = require "fs"
paperclip = require "paperclip"
bindable = require "bindable"
express = require "express"
path = require "path"

module.exports = (app) ->
  docs = loadArticles app

  app.server.use "/docs/files", express.static app.get("directories.docs")

  app.models.set("docs", docs)


loadArticles = (app) ->
  articleFiles = glob.sync app.get("directories.docs") + "/**/*.article.*"

  docs = articleFiles.map (articleFile) ->
    loadArticle app, articleFile

  categoriesDict = {}

  for doc in docs
    continue unless doc?.get?
    cat = String(doc.get("category")).toLowerCase()
    unless categoriesDict[cat]
      categoriesDict[cat] = []

    categoriesDict[cat].push doc


  categories = new bindable.Collection()


  for name of categoriesDict
    categories.push new bindable.Object {
      _id: name.replace(/\s+/g, "-").toLowerCase(),
      name: name,
      children: new bindable.Collection(categoriesDict[name]),
      content: combineArticles(categoriesDict[name])
    }

  categories


combineArticles = (articles) ->
  articles.map((article) ->
    article.get("content")
  ).join "<hr />"
loadArticle = (app, filePath) ->
  extension = filePath.split(".").pop()

  if extension is "md"
    context = parseMarkdown app, filePath
  else if /js|coffee/
    viewClass = require(filePath)
    context = new viewClass null, app
    context.set("content", context.render().toString())


  context





parseMarkdown = (app, filePath) ->
  content = fs.readFileSync filePath, "utf8"
  codeBlocks = content.match(repl = /```[\s\S]+```/g) || []
  content = content.replace(repl, ",,,,,CODE_BLOCK,,,,,")
  pcBlocks  = content.match(repl = /\{\{[\s\S]+\}\}/g) || []
  content = content.replace(repl, ",,,,,PC_BLOCK,,,,,")

  content = marked(content)

  for pcBlock in pcBlocks
    content = content.replace ",,,,,PC_BLOCK,,,,,", pcBlock

  content = paperclip.template(content, app).bind(context = new bindable.Object({
    __dirname: filePath
  })).render().toString()

  unless context.get("name")
    context.set("name", path.basename(filePath).split(".").shift().replace(/^\d+/, ""))

  context.set("_id", context.get("name").replace(/[?!.]+/g, "").replace(/\s+/g, "-").toLowerCase())


  for codeBlock in codeBlocks
    content = content.replace ",,,,,CODE_BLOCK,,,,,", marked codeBlock

  context.set "content", content

  context

