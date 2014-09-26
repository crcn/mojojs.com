module.exports = (app) ->
  if process.browser
    logBrowser app
  else
    logNode app


logBrowser = (app) ->
  window.onerror = (message, url, lineNumber, columnNumber, error) ->

    logger.error "exception", {
      message: message,
      sourceFile: url,
      lineNumber: lineNumber,
      columnNumber: columnNumber,
      error: error?.stack
    }


logNode = (app) ->
  process.on "uncaughtException", (error) ->
    logger.error "exception", {
      error: error?.stack
    }