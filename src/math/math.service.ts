import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class MathService {
  constructor(private readonly logger: LoggerService) {}

  add(a: number, b: number): number {
    const result = a + b;
    this.logger.log(`Add: ${a} + ${b} = ${result}`);
    return result;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
  }

  power(base: number, exp: number): number {
    if (exp < 0) throw new Error('Negative exponent not allowed');
    return Math.pow(base, exp);
  }

  sqrt(x: number): number {
    if (x < 0) throw new Error('Cannot take square root of negative number');
    return Math.sqrt(x);
  }

  max(...args: number[]): number {
    return Math.max(...args);
  }

  min(...args: number[]): number {
    return Math.min(...args);
  }

  async slowAdd(a: number, b: number): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(a + b), 100));
  }
}
