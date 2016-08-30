# Ultimatum and Dictator Games for xeejp
React + Redux with Webpack

## Installation
```
$ cd <your xee root>/experiments
$ git clone git@github.com:xeejp/ultimatum-and-dictator-games.git
$ cd ultimatum-and-dictator-games/
$ npm install
$ webpack
```
and insert  this lines into \<your xee root\>/config/experiments.exs
```exs:experiments.exs
experiment "UltimatumGame",
  file: "experiments/ultimatum-and-dictator-games/script.exs",
  host: "experiments/ultimatum-and-dictator-games/host.js",
  participant: "experiments/ultimatum-and-dictator-games/participant.js"
```
