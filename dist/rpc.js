export async function rpc(service, method, req) {
    const response = await fetch(`/twirp/${service}/${method}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });
    if (!response.ok) {
        const body = await response.json();
        const msg = `rpc error: http code=${response.status}; code=${body.code}; msg=${body.msg};`;
        throw new Error(msg);
    }
    return response.json();
}
//# sourceMappingURL=rpc.js.map