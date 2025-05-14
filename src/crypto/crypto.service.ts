import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CryptoService {
  async getBitcoinPrice(): Promise<number> {
    interface BitcoinPriceResponse {
      bitcoin: {
        usd: number;
      };
    }

    const response = await axios.get<BitcoinPriceResponse>(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    );

    return response.data.bitcoin.usd;
  }
}
