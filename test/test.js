let expect = require( 'chai' ).expect;
let describe = require( 'mocha' ).describe;
let db = require( '../database/db' );
let MFL = require( '../src/MFL' );

describe( 'Can access database', function() {
  it( 'should establish sequelize connection', async function() {

    let connectionSuccess = await db.sequelize.authenticate().then( () => {
      return true;
    } ).catch( e => {
      console.error( e );
      return false;
    } );

    expect( connectionSuccess ).to.be.true;

  } );
} );

describe( 'Can login to MFL', function() {
  let api;
  let cookie;
  api = new MFL();
  it( 'should get a cookie from MFL', async function() {
    cookie = await api.login().then( ( isSet ) => {
      return isSet;
    } ).catch( e => {
      console.error( e );
      return false;
    } );
    expect( cookie ).to.be.true;
  } );

} );

describe( 'Can get/set api object fields', function() {
  it( 'should be able to get/set the cookie on api wrapper object', function() {
    let api = new MFL();
    let cookie = api.login();
    api.setCookie( cookie );
    let cookieTmp = api.getCookie();
    expect( cookie ).to.eq( cookieTmp ).not.eq(null);
  } );
  it( 'should be able to get/set the leagueID on api wrapper object', function() {
    let myLeagueID = 39531;
    let api = new MFL();
    api.setLeagueID( myLeagueID );
    expect( api.getLeagueID() ).to.eq( myLeagueID );
  } );
  it( 'should be able to get/set the week on api wrapper object', function() {
    let week = 2;
    let api = new MFL();
    api.setWeek( week );
    expect( api.getWeek() ).to.eq( week );
  } );
} );


describe( 'Request Types with required parameters', function() {
  let api = new MFL();
  it( 'should throw error when logged in and league id is required but not supplied', async function() {
    await api.login();
    api.setLeagueID( null );
    expect( () => api.request( 'league' ) ).to.throws();
  } );

  it( 'should not throw error when user logged in and league id is required and supplied', async function() {
    await api.login();
    api.setLeagueID( 35391 );
    expect( () => api.request( 'league' ) ).to.not.throws();
  } );

  it( 'should throw error when user logged in and week is required and not supplied', async function() {
    await api.login();
    api.setWeek(null);
    expect( () => api.request( 'franchiseScoreAdjustment' ) ).to.throws();
  } );

  it('should not throw error when user logged in and week is supplied', async function() {
    await api.login();
    api.setWeek(1);
    expect(() => api.request('franchiseScoreAdjustment')).to.not.throws();
  });

  it('should throw an error when user logged in and player id is required and not supplied', async function(){
    await api.login();
    expect( () => api.request( 'playerProfile' ) ).to.throws();
  });

  it('should not throw error when user logged in and player id is required and is supplied', async function() {
    await api.login();
    api.setPlayerID(10);
    expect(() => api.request('playerProfile')).to.not.throws();
  });

} );