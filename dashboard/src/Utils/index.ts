import {default as isoFetch} from 'isomorphic-fetch';

export type RequestMethod = "GET" | "PUT" | "POST" | "DELETE" | "PATCH"

export const serverBase = ():string=> `http://${process.env.REACT_APP_SERVER_IP}:${process.env.REACT_APP_SERVER_PORT}`
export const scraperBase = ():string=> `http://${process.env.REACT_APP_SCRAPER_IP}:${process.env.REACT_APP_SCRAPER_PORT}`


export const fetch = async  <R = any>(
  url:string,
  method?:RequestMethod,
  body?:BodyInit,
):Promise<R> => {

  const response = await isoFetch(url,{method, body});
  if (!response.ok) {
    let detailedError:string;
    try {
      detailedError = await response.text();
    } catch (err) {
      detailedError = `${err}`;
    }
    console.error(`${method}:${url}`, detailedError)
    throw new Error(detailedError)
  };
  return await response.json();
}