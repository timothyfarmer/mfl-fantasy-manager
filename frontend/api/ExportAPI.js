import {RESTDataSource} from "apollo-datasource-rest";
import {moment} from 'moment';
export default class ExportAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.baseURL + '/export';
  }

  async players(players,  since, details) {
    since = moment(since).format()
    return this.get('players', {
      'TYPE': 'players',
      'PLAYERS': players,
      'DETAILS': details,
      'SINCE': since,
    });
  }
}