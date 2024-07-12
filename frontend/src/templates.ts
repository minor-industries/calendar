export const dayTemplate = `
    <td id="{{date}}">
        <span class="date-number">{{day}}</span>
        {{#each resultSets}}
        <div class="photos" style="background-color: {{color}};" data-date="{{date}}" data-query="{{query}}">
            {{count}}
        </div>
        {{/each}}
    </td>
`

export const monthTemplate = `
    <div class="pure-u-1 pure-u-md-1-2 pure-u-xl-1-3">
        <div style="text-align: center; padding-top: 20px;">{{name}}</div>
        <table class="calendar">
            <thead>
            <tr>
                {{#each days}}
                <th>{{this}}</th>
                {{/each}}
            </tr>
            </thead>
            <tbody>
            <tr>
                {{#each leading}}
                <td class="empty"></td>
                {{/each}}
                {{#each firstWeek}}
                {{> day this}}
                {{/each}}
            </tr>
            {{#each middleWeeks}}
            <tr>
                {{#each this}}
                {{> day this}}
                {{/each}}
            </tr>
            {{/each}}
            <tr>
                {{#each lastWeek}}
                {{> day this}}
                {{/each}}
                {{#each trailing}}
                <td class="empty"></td>
                {{/each}}
            </tr>
            </tbody>
        </table>
    </div>
`

export const yearTemplate = `
    <div class="pure-g">
        <div class="pure-u-1">
        <div class="year">
            <h1>{{this.year}}</h1>
        </div>
        </div>
    {{#each this.months}}
    {{> month this}}
    {{/each}}
    </div>
`

