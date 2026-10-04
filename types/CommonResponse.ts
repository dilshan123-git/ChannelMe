export type CommonResponse<T = any> = {
    success: boolean;
    message: string;
    data: T | null;
    error?: any;
    meta?: any;
};