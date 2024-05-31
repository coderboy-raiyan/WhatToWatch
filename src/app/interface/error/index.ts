export type TErrorSources = {
    path: string;
    message: string;
}[];

export type TGenericErrorResponse = {
    success: boolean;
    statusCode: string;
    errorSources: TErrorSources;
};
