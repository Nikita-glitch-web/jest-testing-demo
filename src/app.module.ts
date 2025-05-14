import { Module } from '@nestjs/common';
import { MathService } from './math/math.service';
import { LoggerService } from './logger/logger.service';
import { MathController } from './math/math.controller';
import { CryptoService } from './crypto/crypto.service';
import { CryptoController } from './crypto/crypto.contoller';

@Module({
  imports: [],
  providers: [MathService, LoggerService, CryptoService],
  controllers: [MathController, CryptoController],
})
export class AppModule {}
