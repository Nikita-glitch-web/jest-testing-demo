import { ParseIntPipe } from './parse-int.pipe';

describe('ParseIntPipe', () => {
  const pipe = new ParseIntPipe();

  it('should parse int', () => {
    expect(pipe.transform('42')).toBe(42);
  });

  it('should throw if not a number', () => {
    expect(() => pipe.transform('abc')).toThrow('Validation failed');
  });
});
