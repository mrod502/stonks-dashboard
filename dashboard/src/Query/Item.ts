import {Query, Condition} from './Query';


export interface ItemQuery {
  Created:Query<Date>;
  Class:Query<string>;
  Archived:Query<boolean>;
}

export const Build = ({}):ItemQuery=>{



  return {

  } as ItemQuery;
}