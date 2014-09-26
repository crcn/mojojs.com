
function sortLessFiles (lessFiles) {
  return lessFiles.sort(function(a, b) {

    var alen = 0, blen = 0, aparts = a.split("/"), bparts = b.split("/");

    alen = aparts.length;
    blen = bparts.length;

    // sort bootstrap to the top
    aBootstrapIndex = aparts.indexOf("bootstrap");
    bBootstrapIndex = bparts.indexOf("bootstrap");
    if(aBootstrapIndex > -1 || bBootstrapIndex > -1)
      return aBootstrapIndex > bBootstrapIndex ? 1 : -1;

    // Sort mojette to the top after bootstrap
    aMojetteIndex = aparts.indexOf("mojette");
    bMojetteIndex = bparts.indexOf("mojette");
    if(aMojetteIndex > -1 || bMojetteIndex > -1)
      return aMojetteIndex > bMojetteIndex ? 1 : -1;



    // not same folder depth? files with less slashes take higher
    // priority
    if (alen !== blen) {
      return alen > blen ? 1 : -1;
    }

    // same folder depth? sort by name here.
    for (var i = 0, n = aparts.length; i < n; i++) {

      var apart  = aparts[i],
      bpart      = bparts[i];

      // top folder takes highest priority. Stop when something isn't 
      // equal
      if (apart !== bpart)
      if (apart > bpart) {
        return 1;
      } else {
        return -1;
      }
    }
  });
}

module.exports = sortLessFiles;