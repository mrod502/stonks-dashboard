import {Query, QueryBase} from './Query';


export interface ItemQuery extends QueryBase{
  Created?:Query<Date>;
  Class?:Query<string>;
  Archived?:Query<boolean>;
}
