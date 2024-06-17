export interface Info {
    id: string
    rotation: number
    preview_file: string
    original_file: string
    date_time: string // TODO?
    model: string
    hash: string
    extension: string
    deleted: boolean
    known: boolean
    rating: number
    primary_file_size: number
}

export interface GetPhotosReq {
    query: string
    view: string
    date: string
}

export interface GetPhotosResp {
    photos: Info[]
}

export interface NextDateResp {
    date: string
}

export interface RotateReq {
    id: string
    rotation: number
}

export interface DeleteReq {
    ids: string[]
}

export interface UndeleteReq {
    ids: string[]
}

export interface KnowReq {
    ids: string[]
}

export interface Empty {
}

export interface TagReq {
    ids: string[]
    tag: string
}

export interface ExportReq {
    ids: string[]
    path: string
}

export interface StarReq {
    ids: string[]
    num: number
}

interface TwirpError {
    code: string
    msg: string
}

function rpc(
    service: string,
    method: string,
    req: any,
) {
    return fetch(`/twirp/${service}/${method}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    }).then(response => {
        if (!response.ok) {
            return response.json().then((body: TwirpError) => {
                const msg = `rpc error: http code=${response.status}; code=${body.code}; msg=${body.msg};`;
                return Promise.reject(Error(msg));
            })
        }
        return response.json();
    })
}

const api = "api.API";
const calendar = "api.Calendar";

export function Delete(req: DeleteReq): Promise<Empty> {
    return rpc(api, "Delete", req)
}

export function Undelete(req: UndeleteReq): Promise<Empty> {
    return rpc(api, "Undelete", req)
}

export function Know(req: KnowReq): Promise<Empty> {
    return rpc(api, "Know", req)
}

export function Rotate(req: RotateReq): Promise<Empty> {
    return rpc(api, "Rotate", req)
}

export function GetPhotos(req: GetPhotosReq): Promise<GetPhotosResp> {
    return rpc(api, "GetPhotos", req)
}

export function GetNextDate(req: GetPhotosReq): Promise<NextDateResp> {
    return rpc(api, "GetNextDate", req)
}


export function Tag(req: TagReq): Promise<Empty> {
    return rpc(api, "Tag", req)
}

export function Export(req: ExportReq): Promise<Empty> {
    return rpc(api, "Export", req)
}

export function Star(req: StarReq): Promise<Empty> {
    return rpc(api, "Star", req)
}

type CalendarEventReq = {
    view: string
};

type CalendarResultSet = {
    color: string
    date: string
    query: string
    count: number
};

type CalendarEventResp = {
    result_sets: CalendarResultSet[]
};

export function GetEvents(req: CalendarEventReq): Promise<CalendarEventResp> {
    return rpc(calendar, "GetEvents", req);
}


