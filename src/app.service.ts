import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'proyecto creado por Juan José y Pedro';
  }
}
