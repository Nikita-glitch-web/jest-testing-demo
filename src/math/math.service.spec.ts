import { MathService } from './math.service';

describe('MathService', () => {
  let service: MathService;
  let mockLogger: { log: jest.Mock };

  beforeEach(() => {
    mockLogger = { log: jest.fn() };
    service = new MathService(mockLogger as any);
  });

  it('should log when adding numbers', () => {
    const result = service.add(1, 2);
    expect(result).toBe(3);
    expect(mockLogger.log).toHaveBeenCalledWith('Add: 1 + 2 = 3');
  });
  it('should add numbers', () => {
    expect(service.add(2, 3)).toBe(5);
  });

  it('should subtract numbers', () => {
    expect(service.subtract(5, 3)).toBe(2);
  });

  it('should multiply numbers', () => {
    expect(service.multiply(2, 4)).toBe(8);
  });

  it('should divide numbers', () => {
    expect(service.divide(10, 2)).toBe(5);
  });

  it('should throw on divide by zero', () => {
    expect(() => service.divide(10, 0)).toThrow('Cannot divide by zero');
  });

  it('should calculate power', () => {
    expect(service.power(2, 3)).toBe(8);
  });

  it('should throw on negative exponent', () => {
    expect(() => service.power(2, -1)).toThrow('Negative exponent not allowed');
  });

  it('should calculate square root', () => {
    expect(service.sqrt(16)).toBe(4);
  });

  it('should throw on sqrt of negative number', () => {
    expect(() => service.sqrt(-4)).toThrow(
      'Cannot take square root of negative number',
    );
  });

  it('should find max number', () => {
    expect(service.max(1, 5, 3)).toBe(5);
  });

  it('should find min number', () => {
    expect(service.min(1, 5, 3)).toBe(1);
  });

  it('should async add numbers', async () => {
    await expect(service.slowAdd(2, 2)).resolves.toBe(4);
  });
});
