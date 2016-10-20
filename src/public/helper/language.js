var languageHelper = {
  get: function(lan) {
    var languageData = JSON.parse(localStorage.getItem('lan-' + lan));
    return languageData;
  }
}
module.exports = languageHelper;
