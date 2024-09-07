import {rpc} from "./rpc.js";

const calendar = "calendar.Calendar";

export type CalendarEventReq = {
    view: string
};

export type CalendarResultSet = {
    color: string
    date: string
    query: string
    count: number
};

export type CalendarEventResp = {
    result_sets: CalendarResultSet[]
};

export interface ApiClient {
    getEvents(req: CalendarEventReq): Promise<CalendarEventResp>
}

export class DefaultApiClient implements ApiClient {
    getEvents(req: CalendarEventReq): Promise<CalendarEventResp> {
        return rpc("calendar.Calendar", "GetEvents", req);
    }
}
