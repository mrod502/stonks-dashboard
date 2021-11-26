import {fetch} from '../../Utils'
import { DataGrid, GridColDef, GridValueGetterParams } from '@material-ui/data-grid';
const FINVIZ_HOME = "finviz-home";

export interface SignalProps {
  id:number
	Ticker:string;
	Last:number;
	Change:number;
	Volume:number;
	Signal:string;
}

export interface SignalTableProps {
  Items:SignalProps[];
}


export interface HomeProps {
  Signals:SignalTableProps;

}

export const Signal = ({ Ticker, Last, Change, Volume, Signal }:SignalProps) => (
  <tr>
    <td>{Ticker}</td>
    <td>{Last}</td>
    <td>{Change}</td>
    <td>{Volume}</td>
    <td>{Signal}</td>
  </tr>
)

export const SignalTable = ({Items}:SignalTableProps) => {

  return (
    <div style={{height: '100%', width: '100%'}}>
      <span>Finviz</span>
      <DataGrid style={{minHeight: '100%'}}
        columns={[
          { field: 'Ticker', headerName: 'Ticker', flex: 1},
          { field: 'Last', headerName: 'Last', flex: 0.8},
          { field: 'Change', headerName: 'Change', flex: 1 },
          { field: 'Volume', headerName: 'Volume', flex: 1 },
          { field: 'Signal', headerName: 'Signal', flex: 1 },
        ]}
        rows={Items}
      />
    </div>
  )
}

export const getHomeProps = async ():Promise<HomeProps> => {
  try{
    console.log(process.env.REACT_APP_SERVER_IP)
    return await fetch<HomeProps>(`http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}/${FINVIZ_HOME}`)
  }catch(err){
    console.error(err)
    return {Signals:{Items:[] as SignalProps[]}} as HomeProps ;
  }
}