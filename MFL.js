#!/usr/bin/env node
const axios = require( 'axios' );
require( 'dotenv' ).config();

let leagueID;
requireLogin = [
  'league',
  'leagueStandings'
];
requireLeagueID = [
  'league',
  'rules',
  'rosters',
  'salaries',
  'leagueStandings',
  'schedule',
  'weeklyResults',
  'liveScoring',
  'draftResults',
  'futureDraftPicks',
  'auctionResults',
  'freeAgents',
  'transactions',
  'pendingWaivers',
  'leagueSearch',
  'messageBoard',
  'messageBoardThread',
  'playerRosterStatus',
  'playerStatus',
  'accounting',
  'pendingTrades',
  'tradeBait',
  'assets',
  'myWatchList',
  'myDraftList',
  'polls',
  'survivorPool',
  'pool',
  'playoffBrackets',
  'playoffBracket',
  'appearance',
  'salaryAdjustments',
  'franchises',
  'salaryAdj',
  'playerScoreAdjustment',
  'lineup',
  'fcfsWaiver',
  'acquireFreeAgent',
  'waiverRequest',
  'blindBidWaiverRequest',
  'ir',
  'taxi_squad',
  'pollVote',
  'tradeProposal',
  'tradeResponse',
  'survivorPoolPick',
  'poolPicks',
  'calendarEvent',
  'emailMessage',
  'live_draft',
  'live_chat',
  'chat_save',

];
requireWeek = [
  'franchiseScoreAdjustment',
  'playerScoreAdjustment',
  'lineup',

];
requirePlayerID = [
  'playerProfile',
  'playerRosterStatus',
  'playerStatus',
  'myDraftList',
  'tradeProposal',
  'tradeResponse',
  'tradeBait',
];

let MFL = function() {
  this.cookie = null;
};

MFL.prototype.setLeagueID = ( leagueID ) => {
  this.leagueID = leagueID;
};

MFL.prototype.getLeagueID = () => {
  return this.leagueID;
};

MFL.prototype.setWeek = (week) => {
  this.week = week;
};

MFL.prototype.getWeek = () => {
  return this.week;
};

MFL.prototype.request = ( reqType, options, callback ) => {
  let leagueID = options.leagueID || this.leagueID;
  let week = options.week || this.week;
  let playerID = options && options.playerID ? options.playerID : null;

  params = '';
};


MFL.prototype.login = async() => {
  const settings = {
    host: process.env.MFL_BASEURL,
    username: process.env.MFL_USERNAME,
    password: process.env.MFL_PASSWORD,
    year: process.env.YEAR
  };


  const login_url = settings.host + '/' + settings.year + '/login?USERNAME=' + settings.username + '&PASSWORD=' + settings.password + '&XML=1';

  console.log( "Logging in: ", login_url );

  return axios.get( login_url ).then( res => {
    let cookie = res.data.match( /MFL_USER_ID="([^"]*)">OK/ )[ 1 ];

    if( ! cookie ) {
      throw new Error( "Could not get cookie! Check your request!" );
    }
    console.log( "Logged in with cookie", cookie );
    this.cookie = cookie;
  } );
};

module.exports = MFL;





