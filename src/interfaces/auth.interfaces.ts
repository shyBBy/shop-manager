export interface ErrorRes {
    statusCode: number;
    message: string;
}

export interface UserToken {
    token: string;
}

// export interface UserRes {
//     isSuccess: boolean;
//     message: string;
//     statusCode: number;
//     data: {
//         token: string;
//         email: string;
//         uuid: string;
//         store: boolean;
//     };
// }

export interface StoreData {
    id: string;
    name: string;
    url: string;
}

export interface UserData {
    id: string;
    email: string;
    store: StoreData | null;
}

export type UserRes = Pick<UserData, 'id' | 'email'> & { store: StoreData | null };



export interface Register {
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}