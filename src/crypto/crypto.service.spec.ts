import { CryptoService } from './crypto.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    service = new CryptoService();
  });

  it('should return mocked bitcoin price', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        bitcoin: {
          usd: 9999,
        },
      },
    });

    const price = await service.getBitcoinPrice();
    expect(price).toBe(9999);
  });
});
