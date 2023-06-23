
export interface ErrorRes {
    statusCode: number;
    message: string;
}

export const setIfErrMsg = async (res: Response) => {
    let errMsg: string | null = null;
    if (!res.ok) {
        const errorRes: ErrorRes | null = await res.json();
        const apiMessage = errorRes?.message ?? 'Spróbuj później';

        switch (res.status) {
            case 400:
                errMsg = apiMessage;
                break;
            case 401:
                errMsg = apiMessage;
                break;
            case 403:
                errMsg = apiMessage;
                break;
            default:
                errMsg = 'Spróbuj później';
                break;
        }
    }
    return errMsg;
};