import StatusCodeEnum from "../Types/Enums/StatusCode";

function ackStatuscodeToHttp(statusCode: StatusCodeEnum): number {
    const isFailure = statusCode === StatusCodeEnum.publishFailure || statusCode === StatusCodeEnum.subscribeFailure || statusCode === StatusCodeEnum.unsubscribeFailure;
    return isFailure ? 400 : 200;
}

export default ackStatuscodeToHttp;