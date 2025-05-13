import { Module } from '@nestjs/common';
import { MathService } from './math/math.service';
import { LoggerService } from './logger/logger.service';
import { MathController } from './math/math.controller';

@Module({
  imports: [],
  providers: [MathService, LoggerService],
  controllers: [MathController],
})
export class AppModule {}
