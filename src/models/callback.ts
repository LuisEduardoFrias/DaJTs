import { Data, Error } from './response.js';

export type Callback = (error: Error, data: Data) => void;
