const axios = require( 'axios' );
const _ = require( 'underscore' );
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

let MFL = function() {
};

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
  return this.cookie
    .replace(/=/gi, '%3D')
    .replace(/\+/gi, '%26')
    .replace(/\//gi, '%2F');
};

this.setPlayerID = MFL.prototype.setPlayerID = ( playerID ) => {
  this.playerID = playerID;
};

this.getPlayerID = MFL.prototype.getPlayerID = () => {
  return this.playerID;
};


MFL.prototype.request = ( reqType ) => {
  let parameters = '';
  if( ! this.cookie ) {
    console.error( "Cannot process request: Not logged in. Make sure to call login before making requests" );
    return;
  }
  if( _.contains( requireLeagueID, reqType ) && ! this.getLeagueID() ) {
    throw new Error( 'League ID is required for request type ' + reqType );
  } else if( _.contains( requireLeagueID, reqType ) ) {
    parameters += '&L=' + this.getLeagueID();
  }
  if( _.contains( requireWeek, reqType ) && ! this.getWeek() ) {
    throw new Error( 'Week is required for request type ' + reqType );
  } else if( _.contains( requireWeek, reqType ) ) {
    parameters += '&W=' + this.getWeek();
  }
  if( _.contains( requirePlayerID, reqType ) && ! this.getPlayerID() ) {
    throw new Error( 'Player ID is required for request type ' + reqType );
  } else if( _.contains( requirePlayerID, reqType ) ) {
    parameters += '&P=' + this.getPlayerID();
  }

  let url = process.env.MFL_BASEURL + '/' + settings.year + '/export?&TYPE=' + reqType + parameters + '&JSON=1';
  console.log( "REQUESTING", url );
  return axios.get( url, {headers:{
    Cookie: this.getCookie()
    }} ).then( response => {
    console.log( response );
  }, );
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





