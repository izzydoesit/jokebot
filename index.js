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
})

handleMessage = (message) => {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if (message.match(' yomama')) {
    yoMamaJoke();
  } else if (message.match(' random')) {
    randomJoke();
  } else if (message.match(' help')) {
    runHelp();
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

      bot.postMessageToChannel(
        'general', 
        `Ok, get this... ${joke}`, 
        {}
      );
    }
  )
}

// Tell a Yo Mama
yoMamaJoke = () => {
  const url = 'http://api.yomomma.info';
  axios.get(url).then(res => {
    const joke = res.data.joke;

    bot.postMessageToChannel(
      'general',
      `Alright, you asked for it... ${joke}`,
      {}
    )
  })
}

// Tell a random joke
randomJoke = () => {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}

// Show help text
runHelp = () => {
  const params = {
    icon_emoji: ':question:'
  }

  const text = `Type @jokebot with either "chucknorris", "yomama", or "random" to make jokebot tell a joke!`;
  bot.postMessageToChannel(
    'general', 
    text, 
    params
  );
}

// Random Comment
randomComment = () => {
  // TODO
}