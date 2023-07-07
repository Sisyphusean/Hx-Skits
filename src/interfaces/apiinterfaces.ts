export interface apiResponse {
    //This is the status of the response
    status: number,
    //This is the message of the response
    message: string,
    //This is the data of the response
    data: Object
}

export interface loginResponse {
    //This is the user's unique id
    id: string,
    //This is the user's username
    username: string,
    //This is the user's JWT
    token: string
}

export interface updateLiveStreamDataObject {
    streamingOn: string,
    streamingLink?: string,
    activityType: string
}