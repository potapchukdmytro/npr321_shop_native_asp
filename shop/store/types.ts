export interface IServiceResponse<T> {
    message: string;
    success: boolean;
    payload: T | null;
}

export interface IUser {
    email: string;
    userName: string;
}

export type ServiceResponse<T> = IServiceResponse<T>;
export type User = IUser | null;