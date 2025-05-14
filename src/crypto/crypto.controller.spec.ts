import { CryptoController } from './crypto.contoller';

describe('CryptoController', () => {
  let controller: CryptoController;
  let mockService: { getBitcoinPrice: jest.Mock };

  beforeEach(() => {
    mockService = {
      getBitcoinPrice: jest.fn().mockResolvedValue(11111),
    };
    controller = new CryptoController(mockService as any);
  });

  it('should return mocked bitcoin price', async () => {
    const result = await controller.getPrice();
    expect(result).toBe(11111);
    expect(mockService.getBitcoinPrice).toHaveBeenCalled();
  });
});
