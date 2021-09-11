import fetch from 'isomorphic-fetch';

export type RequestMethod = "GET" | "PUT" | "POST" | "DELETE" | "PATCH"


export default async <R = any>(
  url:string,
  method?:RequestMethod,
  body?:BodyInit,
):Promise<R> => {

  const response = await fetch(url,{method, body});
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