
var Chance = require('chance');
var chance = new Chance();

const getPost = () => {
  const posts = [];
  for (let i = 0; i < 5; i++) {
    const post =
    {
      "userId": chance.hash({length: 15}),
      "id": chance.hash({length: 15}),
      "title": chance.sentence({ words: 10 }),
      "body": chance.paragraph({ sentences: 5 }),
    }

    posts.push(post);
  }

  return posts;
}

const getPostDetail = () => {
  return {
    "title": chance.sentence({ words: 10 }),
    "body": chance.paragraph({ sentences: 5 }),
  }
}

module.exports.postDetail = getPostDetail;


module.exports.post = getPost;
