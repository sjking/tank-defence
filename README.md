# Tank Defence

An HTML5 canvas game. The purpose of the game is to destroy the aliens invading the city. The player controls a tank. The player can move backwards and forwards and move the tank turret up and down. The player can control the power that the canon shoots from the tank.

## Installation instructions

1. Install node modules: `npm install`
2. Install grunt: `npm install -g grunt`
3. Bundle the application: `grunt bundle` (for local testing), or `grunt dist` (for production)
4. Start the application: `npm start`

The game will start an express.js server listening on localhost at port 3000. Point you browser to `http://127.0.0.1:3000` to start the game.

## Development

There are some grunt tasks to help with development:

1. `grunt watch:debug`: Watches for changes in the *src* directory, and compiles with debugging flags.
2. `grunt debug`: Compiles using the `--debug` option in browserify, which is useful for browser debugging.
