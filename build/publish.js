var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname, '../dist'), function(err) {
  err ? console.error(err) : console.log('publish success');
});