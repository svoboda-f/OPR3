import { Entry } from "./entry";

export interface ServerResponse {
    entries: Entry[];
    numberOfPages: number;
}
