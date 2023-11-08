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
    isActive: boolean;
    store: StoreData | null;
}

export type UserRes = Pick<UserData, 'id' | 'email' | 'isActive'> & { store: StoreData | null };



export interface Register {
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface TokenResponse {
    token: string;
}

export interface WpLogin {
    username: string;
    password: string;
    userId?: string;  // Oznaczamy pole jako opcjonalne
    userEmail?: string;  // Oznaczamy pole jako opcjonalne
}