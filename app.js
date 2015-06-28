var url = require('url');
var connect = require('connect');
var request = require('request');
var FeedParser = require('feedparser');
var cloud = require('./cloud');
var JSONStream = require('JSONStream');
var app = connect();

app.use(cloud);

function getFeed(feedUrl, httpRes) {
  var req = request(feedUrl, {timeout: 10000, pool: false});
  var feedparser = new FeedParser();

  req.on('error', function (res) {
    console.log('req error');
  });

  req.on('response', function (res) {
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

    res.pipe(feedparser);
  });

  feedparser.on('error', function (error) {
    console.log(error, error.stack);
  });

  feedparser.pipe(JSONStream.stringify()).pipe(httpRes);
}

app.use("/feed", function (req, res) {
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*"
  });
  var parsed = url.parse(req.url, true);
  var feedUrl = parsed['query'].url;
  console.log(feedUrl);

  if (feedUrl)
    getFeed(feedUrl, res);
});

module.exports = app;
