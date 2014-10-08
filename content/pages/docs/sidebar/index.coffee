views = require "mojo-views"

class ArticleView extends views.Base
  paper: require("./article.pc")
  bindings:
    "model": "article"

class CategoryView extends views.Base
  paper: require("./category.pc")
  bindings:
    "model": "category"
  children:
    articles: 
      type: "list"
      source: "model.children"
      modelViewClass: ArticleView


class SidebarView extends views.Base
  paper: require("./index.pc")
  children:
    categories: 
      type: "list"
      source: "application.models.docs"
      modelViewClass: CategoryView

module.exports = SidebarView