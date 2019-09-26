'use strict';
const MFL = require('./src/MFL');

const api = new MFL();

const args = require('yargs').argv;

console.log("Request Type:", args.reqType);
console.log("LeagueID:", args.leagueID);
console.log("PlayerID:", args.playerID);
console.log("WeekNumber", args.week);

api.login().then(cookie => {
  api.setLeagueID(args.leagueID);
  api.setPlayerID(args.playerID);
  api.setWeek(args.week);
  api.request(args.reqType);
}).catch(e => {
  console.error("Login failed");
});


