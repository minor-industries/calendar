import {dayTemplate, monthTemplate, yearTemplate} from "./templates.js";

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

export function handleMonth(t: Date): MonthData {
    const thisMonth = t.getMonth();
    let m: MonthData = {
        days: ["S", "M", "T", "W", "T", "F", "S"],
        name: t.toLocaleString('default', {month: 'long'}),
        leading: [],
        trailing: [],
        firstWeek: [],
        middleWeeks: [],
        lastWeek: []
    };

    let pos = t.getDay();
    let i = 0;

    // empty rows leading up to the first date
    for (; i < pos; i++) {
        m.leading.push("");
    }

    let weeks: DateData[][] = [];
    let curWeek: DateData[] = [];

    while (t.getMonth() === thisMonth) {
        let dayData: DateData = {
            day: t.getDate().toString(),
            // TODO: these IDs may collide with other things on the page
            date: t.toISOString().split('T')[0],
            resultSets: []
        };
        curWeek.push(dayData);

        // Increment day
        t.setDate(t.getDate() + 1);
        i++;

        i %= 7;

        if (i === 0) {
            weeks.push(curWeek);
            curWeek = [];
        }
    }

    if (i !== 0) {
        weeks.push(curWeek);
        for (; i < 7; i++) {
            m.trailing.push("");
        }
    }

    if (weeks.length > 0) {
        m.firstWeek = weeks[0];
        m.lastWeek = weeks[weeks.length - 1];
        m.middleWeeks = weeks.slice(1, weeks.length - 1);
    }

    return m;
}

export function renderYear(Handlebars: any, year: number) {
    Handlebars.registerPartial("day", dayTemplate);
    Handlebars.registerPartial("month", monthTemplate);
    const template = Handlebars.compile(yearTemplate);

    const months: MonthData[] = []
    for (let i = 0; i < 12; i++) {
        const resp = handleMonth(new Date(year, i));
        months.push(resp);
    }

    const html = template({
        year: year,
        months: months,
    });
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.firstChild;
}

export function addEvent(s: ResultSet) {
    const td = document.getElementById(s.date);
    if (td === null) {
        return // TODO:
    }

    const query = "query";

    const content = `
        <div 
            class="photos" 
            style="background-color: ${s.color};" 
            data-date="${s.date}" 
            data-query="${s.query}"
        >${s.count  }</div>`

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    const div = doc.body.firstChild as HTMLDivElement;
    div.addEventListener('click', () => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const view = params.get('view') ?? "default";

        const paramViewer = params.get('viewer');
        const viewer = paramViewer && paramViewer.trim() ? paramViewer : "fullscreen";

        const date = div.getAttribute("data-date")!;
        const query = div.getAttribute("data-query")!;

        // href="%s.html?view=%s&query=%s&date=%s"
        window.location.href = `/${viewer}.html?view=${view}&query=${query}&date=${date}`
    })

    td.appendChild(doc.body.firstChild as ChildNode);
}