const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'images/pcgamer-logo.png',
  },
  summary: {
    type: String
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
