const result = require('dotenv').config();
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: SLACK_BOT_TOKEN,
  name: 'jokebot'
});

// Start handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':laughing:'
  }

  bot.postMessageToChannel(
    'general', 
    'Get ready to laugh with @Jokebot', 
    params
  );
});

// Error Handler
bot.on('error', (err) => console.log(err));
bot.on('message', data => {
  if(data.type !== 'message') {
    return;
  }
  handleMessage(data.text);
  console.log('MESSAGE:', data)
})

handleMessage = (message) => {
  switch (true) {
    case / chucknorris/.test(message):
      console.log(message, '<= message')
      chuckJoke();
    case / yom[a|o]m+a/.test(message):
      yoMama();
    default:
      randomComment();
  }
}

// Tell a Chuck Norris
chuckJoke = () => {
  const url = 'http://api.icndb.com/jokes/random';
  axios.get(url)
    .then(res => {
      const joke = res.data.value.joke;
      const params = {
        icon_emoji: ':laughing:'
      }

      bot.postMessageToChannel('general', 
        joke, 
        params
      );
    }

  )
}

// Yo Mama
yoMama = () => {

}

// Random Comment
randomComment = () => {

}