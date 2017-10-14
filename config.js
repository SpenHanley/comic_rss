var config = require('config')

exports.rssConf = {
    feeds: config.get('rss_feeds') // feeds.feed.{title}/{address}
}