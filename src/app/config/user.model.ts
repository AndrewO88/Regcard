import {PersonData} from '../services/log-data.service';

export class User {
  id: string;
  login: string;
  password: string;
  personData: PersonData;
}
