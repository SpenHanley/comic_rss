var express = require('express');
var router = express.Router();
var parser = require('rss-parser')
var config = require('../config')
var comics = []

/* GET home page. */
router.get('/', function(req, res, next) {
  if (comics.length > 0)
  {
    res.render('index', { comics: comics });
  } else
  {
    populateComics()
    console.log(comics.length)
    res.render('index', { comics: comics });
  }

});

function populateComics()
{
  feeds = config.rssConf.feeds;

  for (var i = 0; i < feeds.length; i++)
  {
    comic = []
    parser.parseURL(feeds[i].feed.address, (err, parsed) => {
      for (var i = 0; i < parsed.feed.entries.length; i++)
      {
        var title = parsed.feed.entries[i].title;
        var address = parsed.feed.entries[i].link;
        comic.push({'title': title, 'link': address});
      }
      comics.push(comic);
    })
  }
}

module.exports = router;