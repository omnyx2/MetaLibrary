export const pipe = ( ...fns ) => (x) =>{

  if( x.result === undefined) x.result = {
    message: "Pipe hase been started",
    status: 200,
  };
  return fns.reduce(async (y, fn) =>  {
    const result = await y
    // 반응이 시작되서 status가 생성되면 그 이후부터 스테이트를 검출하라
    if(result.result.status && result.result.status !== 200) {
      console.error("error at", fn.name, "\n property: ", result);
      throw Error("error at", fn.name, "\n property: ", result)
    }
    return fn(result)}, x);
}