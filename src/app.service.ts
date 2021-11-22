import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  get(): any {
    return {
      message: "Secret Santa API"
    };
  }
}
