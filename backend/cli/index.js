'use strict';
const MFL = require('./MFL');

const api = new MFL();

const args = require('yargs').argv;

console.log("Request Type:", args.apiMethod); // the API method to request (i.e. players, pendingWaivers, etc.)
console.log("LeagueID:", args.leagueID);
console.log("PlayerID:", args.playerID);
console.log("WeekNumber:", args.week);
console.log("Request Type: ", args.reqType); // this is EXPORT or IMPORT
console.log("Message: ", args.message); // this is EXPORT or IMPORT

api.login().then((cookie) => {
  api.setLeagueID(args.leagueID);
  api.setPlayerID(args.playerID);
  api.setWeek(args.week);
  api.setMessage(args.message);
  api.setReqType(args.reqType);



  api.request(args.apiMethod);
}).catch(e => {
  console.error("Login failed");
  console.error(e);
});


