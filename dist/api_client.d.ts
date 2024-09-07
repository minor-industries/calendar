export type CalendarEventReq = {
    view: string;
};
export type CalendarResultSet = {
    color: string;
    date: string;
    query: string;
    count: number;
};
export type CalendarEventResp = {
    result_sets: CalendarResultSet[];
};
export interface ApiClient {
    getEvents(req: CalendarEventReq): Promise<CalendarEventResp>;
}
export declare class DefaultApiClient implements ApiClient {
    getEvents(req: CalendarEventReq): Promise<CalendarEventResp>;
}
//# sourceMappingURL=api_client.d.ts.map