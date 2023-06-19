export interface ErrorRes {
    statusCode: number;
    message: string;
}

export interface UserToken {
    token: string;
}

export interface UserRes {
    isSuccess: boolean;
    message: string;
    statusCode: number;
    data: {
        token: string;
        email: string;
        uuid: string;
        store: boolean;
    };
}



export interface Login {
    email: string;
    password: string;
}

export interface Register {
    email: string;
    password: string;
}