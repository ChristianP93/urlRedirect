import pg from "pg";
import { POSTGRES_INFO } from "../../infoDb";

// const POSTGRES_INFO = process.env.POSTGRES_INFO;

const Client = new pg.Client(POSTGRES_INFO);
export { Client }
