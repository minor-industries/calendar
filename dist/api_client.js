import { rpc } from "./rpc.js";
const calendar = "calendar.Calendar";
export class DefaultApiClient {
    getEvents(req) {
        return rpc("calendar.Calendar", "GetEvents", req);
    }
}
//# sourceMappingURL=api_client.js.map