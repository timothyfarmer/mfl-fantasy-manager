const axios = require( 'axios' );
const _ = require( 'underscore' );
const util = require( "util" );
const url = require('url');
require( 'dotenv' ).config();

const requireLeagueID = [
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
const requireWeek = [
  'franchiseScoreAdjustment',
  'playerScoreAdjustment',
  'lineup',
];
const requirePlayerID = [
  'playerProfile',
  'playerRosterStatus',
  'playerStatus',
  'myDraftList',
  'tradeProposal',
  'tradeResponse',
  'tradeBait',
];

const settings = {
  host: process.env.MFL_BASEURL,
  username: process.env.MFL_USERNAME,
  password: process.env.MFL_PASSWORD,
  year: process.env.YEAR
};

let MFL = function() {};

this.setLeagueID = MFL.prototype.setLeagueID = ( leagueID ) => {
  this.leagueID = leagueID;
};

this.getLeagueID = MFL.prototype.getLeagueID = () => {
  return this.leagueID;
};

this.setWeek = MFL.prototype.setWeek = ( week ) => {
  this.week = week;
};

this.getWeek = MFL.prototype.getWeek = () => {
  return this.week;
};

this.setCookie = MFL.prototype.setCookie = ( cookie ) => {
  this.cookie = cookie;
};

this.getCookie = MFL.prototype.getCookie = () => {
  return encodeURIComponent(this.cookie);
};

this.setPlayerID = MFL.prototype.setPlayerID = ( playerID ) => {
  this.playerID = playerID;
};

this.getPlayerID = MFL.prototype.getPlayerID = () => {
  return this.playerID;
};

this.setReqType = MFL.prototype.setReqType = (reqType) => {
  this.reqType = reqType;
};
this.getReqType = MFL.prototype.getReqType = () => {
  return this.reqType;
};

this.setMessage = MFL.prototype.setMessage = (message) => {
  this.message = encodeURIComponent(message);
  console.log("THIS MESSAGE SET TO", this.message);
};

this.getMessage = MFL.prototype.getMessage = () => {
  return this.message;
};


MFL.prototype.request = ( apiMethod ) => {
  if(!this.reqType) {
    this.setReqType('export'); // if no request type, assume export
  }
  let parameters = '';
  if( ! this.cookie ) {
    console.error( "Cannot process request: Not logged in. Make sure to call login before making requests" );
    return;
  }
  if( _.contains( requireLeagueID, apiMethod ) && ! this.getLeagueID() ) {
    throw new Error( 'League ID is required for request type ' + apiMethod );
  } else if( _.contains( requireLeagueID, apiMethod ) ) {
    parameters += '&L=' + this.getLeagueID();
  }
  if( _.contains( requireWeek, apiMethod ) && ! this.getWeek() ) {
    throw new Error( 'Week is required for request type ' + apiMethod );
  } else if( _.contains( requireWeek, apiMethod ) ) {
    parameters += '&W=' + this.getWeek();
  }
  if( _.contains( requirePlayerID, apiMethod ) && ! this.getPlayerID() ) {
    throw new Error( 'Player ID is required for request type ' + apiMethod );
  } else if( _.contains( requirePlayerID, apiMethod ) ) {
    parameters += '&P=' + this.getPlayerID();
  }

  let url = process.env.MFL_BASEURL + '/' + settings.year + '/' + this.getReqType() + '?&TYPE=' + apiMethod + parameters + '&MESSAGE=' + this.message + '&JSON=1';
  console.log( "REQUESTING", url );
  return axios.get( url, {headers:{
    Cookie: "MFL_USER_ID="+this.getCookie()
    }} ).then( response => {
    console.log( util.inspect(response.data,true,null,true) );
    return response.data;
  }, ).catch(e => console.error(e));
};


MFL.prototype.login = async() => {


  const login_url = settings.host + '/' + settings.year + '/login?USERNAME=' + settings.username + '&PASSWORD=' + settings.password + '&XML=1';

  console.log( "Logging in: ", login_url );

  return axios.get( login_url ).then( res => {
    let cookie = res.data.match( /MFL_USER_ID="([^"]*)">OK/ )[ 1 ];

    if( ! cookie ) {
      throw new Error( "Could not get cookie! Check your request!" );
    }
    console.log( "Logged in with cookie", cookie );
    this.setCookie( cookie );
    return cookie;
  } ).catch( e => {
    console.error( e );
    return false;
  } );
};

module.exports = MFL;





