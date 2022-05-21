import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus, Logger, Inject,
} from '@nestjs/common';

/**
 * @Catch(HttpException)
 * HttpException 발생시
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  /**
   * @param exception 예외 객체
   * @param host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error("exception: "+ exception);
    const res: any =
      exception instanceof HttpException
        ? exception.getResponse()
        : null;

    /* 클라에 전달 */
    response.status(status).json({
      statusCode: status,
      statusMsg: res?.message ?? exception.message
    });
  }
}
