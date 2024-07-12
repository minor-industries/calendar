function rpc(service, method, req) {
    return fetch(`/twirp/${service}/${method}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    }).then(response => {
        if (!response.ok) {
            return response.json().then((body) => {
                const msg = `rpc error: http code=${response.status}; code=${body.code}; msg=${body.msg};`;
                return Promise.reject(Error(msg));
            });
        }
        return response.json();
    });
}
const calendar = "calendar.Calendar";
export function GetEvents(req) {
    return rpc(calendar, "GetEvents", req);
}
//# sourceMappingURL=api.js.map