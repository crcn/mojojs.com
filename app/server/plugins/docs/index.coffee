glob = require "glob"
marked = require "marked"
fs = require "fs"
views = require "mojo-views"
paperclip = require "paperclip"
bindable = require "bindable"
express = require "express"
path = require "path"

module.exports = (app) ->

  app.mediator.on "post bootstrap", (m, next) ->
    docs = loadArticles app

    app.server.use "/docs/files", express.static app.get("directories.docs")

    app.models.set("docs", docs)
    next()

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
  ).join "\n"
loadArticle = (app, filePath) ->
  extension = filePath.split(".").pop()

  if extension is "md"
    context = parseMarkdown app, filePath
  else if /js|coffee/
    viewClass = require(filePath)
    context = new viewClass null, app
    context.set("content", context.render().toString())

  addAPIMethods context
  context



addAPIMethods = (context) ->
  content = context.get("content")


  context.set "properties", content.match(/<h4 .*?>.*?<\/h4>/g)?.map (h4) ->
    {
      _id: h4.match(/id="(.*?)"/)[1],
      name: h4.match(/<h4 .*?>(.*?)<\/h4>/)[1].replace(/\(.*?\)/g, " ( )").replace(/<.*?>/g,"")
    }


articleTemplate = paperclip.template(fs.readFileSync(__dirname + "/article.pc", "utf8"))

getCleanTitle = (text) ->
  text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()


stripHTML = (text) ->
  text.replace(/<[^>]*>/g,"")


parseMarkdown = (app, filePath) ->

  fileName = stripHTML(path.basename(filePath).replace(/\.article\.\w+$/,"").replace(/^\d+\s*/, ""))
  content = fs.readFileSync filePath, "utf8"
  commentBlocks = content.match(repl = /\<!--[\s\S]+?--\>/g) || []
  content = content.replace(repl, "<!--COMMENT-->")
  codeBlocks = content.match(repl = /```[\s\S]+?```/g) || []
  content = content.replace(repl, ",,,,,CODE_BLOCK,,,,,")
  pcBlocks  = content.match(repl = /({{#[\s\S]+?}}[\s\S]+?{{\/}})|({{[\s\S]+?}})/g) || []
  content = content.replace(repl, ",,,,,PC_BLOCK,,,,,")




  renderer = new marked.Renderer();
  renderer.heading = (text, level) ->

    _id = getLink(text)

    buffer = "<h" + level + " class='doc-headline' id='"+_id+"'>"
    buffer += "<a href='#"+ _id + "' class='link'><span class='glyphicon glyphicon-link'></span></a>"
    buffer += text
    buffer += "</h" + level + ">"
    buffer


  getLink = (text) ->
    String(getCleanTitle(stripHTML(text))).toLowerCase()



  content = marked(content, { renderer: renderer })

  for pcBlock in pcBlocks
    content = content.replace ",,,,,PC_BLOCK,,,,,", pcBlock

  for commentBlock in commentBlocks
    content = content.replace "<!--COMMENT-->", commentBlock

  content = paperclip.template(content, app).bind(context = new views.Base({
    __dirname: path.dirname(filePath)
  }, app)).render().toString()

  unless context.get("name")
    context.set("name", fileName)

  unless context.get("title")
    context.set("title", context.get("name"))

  context.set("_id", context.get("name").replace(/[?!.]+/g, "").replace(/\s+/g, "-").toLowerCase())


  for codeBlock in codeBlocks
    content = content.replace ",,,,,CODE_BLOCK,,,,,", marked codeBlock



  relpath = filePath.replace(app.get("directories.root"), "")
  name    = path.basename(relpath).replace(/article\*$/,"")

  # TODO  -shouldn't hardcode repo here - put in app config
  ghUrl = "http://github.com/mojo-js/mojojs.com/tree/master/" + relpath.replace(name, encodeURIComponent(name))

  content = articleTemplate.bind({
      title: context.get("title"),
      content: content,
      githubUrl: ghUrl
  }).render().toString()


  context.set "content", content

  context
