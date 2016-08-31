# Ultimatum Game for xeejp
React + Redux with Webpack

## Installation
```
$ cd <your xee root>/experiments
$ git clone git@github.com:xeejp/ultimatum-game.git
$ cd ultimatum-game/
$ npm install
$ webpack
```
and insert  this lines into \<your xee root\>/config/experiments.exs
```exs:experiments.exs
experiment "UltimatumGame",
  file: "experiments/ultimatum-game/script.exs",
  host: "experiments/ultimatum-game/host.js",
  participant: "experiments/ultimatum-game/participant.js"
```
