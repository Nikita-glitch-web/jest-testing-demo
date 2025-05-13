import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { MathController } from '../src/math/math.controller';
import { MathService } from '../src/math/math.service';
import { AuthGuard } from '../src/common/guards/auth.guard';
import { ParseIntPipe } from '../src/common/pipes/parse-int.pipe';
import { HttpErrorFilter } from '../src/common/filters/http-error.filter';

describe('MathController (e2e with guard, pipe, filter)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MathController],
      providers: [
        {
          provide: MathService,
          useValue: {
            add: jest
              .fn()
              .mockImplementation((a: number, b: number): number => a + b),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: (context) => {
          const req = (context as import('@nestjs/common').ExecutionContext)
            .switchToHttp()
            .getRequest<{ headers: Record<string, string> }>();
          return !!req.headers['x-auth'];
        },
      })
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ParseIntPipe());
    app.useGlobalFilters(new HttpErrorFilter());
    await app.init();
  });

  it('should return correct sum with valid input and auth', async () => {
    return request(app.getHttpServer())
      .get('/math/add?a=2&b=3')
      .set('x-auth', 'yes') // must be for passing guard
      .expect(200)
      .expect('5');
  });

  it('should return 400 on invalid input', async () => {
    return request(app.getHttpServer())
      .get('/math/add?a=abc&b=3')
      .set('x-auth', 'yes')
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Validation failed',
      });
  });

  it('should return 403 if x-auth is missing', async () => {
    return (
      request(app.getHttpServer())
        .get('/math/add?a=1&b=2')
        // .set('x-auth', 'yes') ← без цього
        .expect(403)
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
