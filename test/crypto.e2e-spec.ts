import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CryptoController } from '../src/crypto/crypto.contoller';
import { CryptoService } from '../src/crypto/crypto.service';
import * as request from 'supertest';

describe('CryptoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        {
          provide: CryptoService,
          useValue: {
            getBitcoinPrice: jest.fn().mockResolvedValue(12345),
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/crypto/price GET should return mocked price', async () => {
    await request(app.getHttpServer())
      .get('/crypto/price')
      .expect(200)
      .expect('12345');
  });

  afterAll(async () => {
    await app.close();
  });
});
