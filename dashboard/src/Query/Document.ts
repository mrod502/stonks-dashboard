import {ItemQuery} from './Item'
import {Query, Build, Condition} from './Query'


export const Blank = ():DocumentQuery=> (
  {
    Limit:0,
    Title:Build("",Condition._,false),
    Symbols:Build("",Condition._,false),
    Sectors:Build("",Condition._,false),
    Source:Build("",Condition._,false),
    ContentType:Build("",Condition._,false),
    Type:Build("",Condition._,false),
    PostedDate:Build(new Date(),Condition._,false)
  }
)

export interface DocumentQuery extends ItemQuery{
  Title?:Query<string>;
  Symbols?:Query<string>;
  Sectors?:Query<string>;
  Source?:Query<string>;
  ContentType?:Query<string>;
  Type?:Query<string>;
  PostedDate?:Query<Date>;
}
