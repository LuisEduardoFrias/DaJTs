import { Data, Error } from "./response";

export type Callback = (error: Error, data: Data) => void;
