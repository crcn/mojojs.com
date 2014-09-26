

function Report (warnings, errors) {
  this.warnings = warnings || [];
  this.errors   = errors   || [];
}

module.exports = Report;