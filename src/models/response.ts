//
export type Data = object | string | null
export type Error = string | null
//
export default interface Response {
  error: Error;
  data: Data;
}