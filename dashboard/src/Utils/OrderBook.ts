

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


  update = (vals:Map<number,Quote[]>) => {
    vals.forEach(q =>{
      
    })

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
    this.ws.onmessage = (m)=>{


    }
  }




  subscribe = (symbol:string) => {
    this.ws.send(JSON.stringify({
      act : "sub",
      sym : symbol,
    }))
  }
  unsubscribe = (symbol:string) => {

  }


}