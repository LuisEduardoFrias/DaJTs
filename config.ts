export const IS_DEVELOPMENT: boolean = false;
export const DB_NAME: string = `./datafile.daj.${
    IS_DEVELOPMENT ? "json" : "db"
}`;
export const LOCK: boolean = false;
