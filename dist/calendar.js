import Handlebars from "handlebars";
import { dayTemplate, monthTemplate, yearTemplate } from "./templates.js";
export function handleMonth(t) {
    const thisMonth = t.getMonth();
    let m = {
        days: ["S", "M", "T", "W", "T", "F", "S"],
        name: t.toLocaleString('default', { month: 'long' }),
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
    let weeks = [];
    let curWeek = [];
    while (t.getMonth() === thisMonth) {
        let dayData = {
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
export function renderYear(year) {
    Handlebars.registerPartial("day", dayTemplate);
    Handlebars.registerPartial("month", monthTemplate);
    const template = Handlebars.compile(yearTemplate);
    const months = [];
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
export function addEvent(s, onClick) {
    const td = document.getElementById(s.date);
    if (td === null) {
        return; // TODO:
    }
    const query = "query";
    const content = `
        <div 
            class="photos" 
            style="background-color: ${s.color};" 
            data-date="${s.date}" 
            data-query="${s.query}"
        >${s.count}</div>`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const div = doc.body.firstChild;
    div.addEventListener('click', () => {
        const date = div.getAttribute("data-date");
        const query = div.getAttribute("data-query");
        onClick({
            date: date,
            query: query,
        });
    });
    td.appendChild(doc.body.firstChild);
}
export function clickHandler(event) {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    const view = params.get('view') ?? "default";
    const paramViewer = params.get('viewer');
    const viewer = paramViewer && paramViewer.trim() ? paramViewer : "fullscreen";
    const queryString = (new URLSearchParams({
        date: event.date,
        query: event.query,
        view: view,
    }).toString());
    window.location.href = `/${viewer}.html?${queryString}`;
}
//# sourceMappingURL=calendar.js.map