import pg from "pg";
import { POSTGRES_INFO } from "../../infoDb";

const Client = new pg.Client(POSTGRES_INFO);
export { Client }
