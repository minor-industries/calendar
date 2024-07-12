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
export declare function GetEvents(req: CalendarEventReq): Promise<CalendarEventResp>;
//# sourceMappingURL=api.d.ts.map