import { Injectable } from '@nestjs/common';
import {Get } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'one-ai-backend',
      timestamp: new Date().toISOString(),
    };
  }
}
