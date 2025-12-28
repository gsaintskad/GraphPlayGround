import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    // Capture the Authorization header
    const authorization = req.get('authorization') || 'No Auth Token';
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const duration = Date.now() - start;

      // Log format: Method URL Status Length - AuthHeader Duration
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - Auth: ${authorization} +${duration}ms`,
      );
    });

    next();
  }
}
