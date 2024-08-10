export const pipe = ( ...fns ) => (x) =>{
  if( x.result === undefined) x.result = {
    message: "Pipe hase been started",
    status: 200,
  };
  return fns.reduce(async (y, fn) => fn(await y), x);      
}