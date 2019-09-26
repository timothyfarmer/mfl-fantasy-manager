let expect = require( 'chai' ).expect;
let describe = require( 'mocha' ).describe;
let db = require( '../database/db' );
let MFL = require( '../MFL' );

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
  it( 'should get a cookie from MFL', async function() {
    let api = new MFL();
    let cookie = await api.login().then( ( cookie ) => {
      return cookie;
    } ).catch( e => {
      console.error( e );
      return null;
    } );
    expect(cookie).to.not.be.null;
  } );
} );

describe('Can get/set leagueID pm api wrapper object', function() {
  it('should be able to get/set the leagueID on api wrapper object', function() {
    let myLeagueID = 39531;
    let api = new MFL();
    api.setLeagueID(myLeagueID);

    expect(api.getLeagueID()).to.eq(myLeagueID);
  })
});

describe('Can get/set week on api wrapper object', function(){
  it('should be able to get/set the week on api wrapper object', function() {
    let week = 2;
    let api = new MFL();
    api.setWeek(week);
    expect(api.getWeek()).to.eq(week);
  })
});