type ResultSet = {
    color: string;
    date: string;
    query: string;
    count: number;
};
type DateData = {
    day: string;
    date: string;
    resultSets: ResultSet[];
};
type MonthData = {
    days: string[];
    name: string;
    leading: string[];
    trailing: string[];
    firstWeek: DateData[];
    middleWeeks: DateData[][];
    lastWeek: DateData[];
};
export declare function handleMonth(t: Date): MonthData;
export declare function renderYear(year: number): ChildNode | null;
interface ClickEvent {
    date: string;
    query: string;
}
export declare function addEvent(s: ResultSet, onClick: (event: ClickEvent) => void): void;
export declare function clickHandler(event: ClickEvent): void;
export {};
//# sourceMappingURL=calendar.d.ts.map