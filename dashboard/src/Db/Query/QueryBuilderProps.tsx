
import QueryProps from './QueryProps';


export default  interface QueryBuilderProps<T> {
  onChange:(newVal:QueryProps<T>)=>void;
  title:string;
}



