

export interface Quote{
  price:number;
  volume:number;
}


export class MarketDepth {

  bid:Map<number,Quote[]>
  ask:Map<number,Quote[]>
  constructor () {
    this.bid = new Map()
    this.ask = new Map()
  }


  update = () => {

  }

  snapshot = () => {

  }

}



export default class {

  depth:Map<string,MarketDepth>
  ws:WebSocket
  constructor(uri:string){
    this.depth = new Map()
    this.ws = new WebSocket(uri)
  }


  subscribe = (symbol:string) => {

  }
  unsubscribe = (symbol:string) => {

  }


}