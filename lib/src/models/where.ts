import { Indexar } from './indexar.js';

type all = string | number | symbol;
type anyProp = { [key: all]: any };

export type Where = {
  index?: Indexar,
  referred?: { [key: all]: Array<anyProp> },
  indexFirst: boolean,
};