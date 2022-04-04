export const extractErrorMessage = (error: any): string | undefined =>
{
    if (error.code === 4001) return undefined
    let message: string = ""
    if (error.data?.message) { 
        message = error.data?.message.replace("execution reverted:","");
    } else {
        message = error.message ?? error.reason;
    }
    return message ? `Failed: ${message}` : `Failed`;
}