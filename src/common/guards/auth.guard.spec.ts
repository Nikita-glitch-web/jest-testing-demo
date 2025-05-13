import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const guard = new AuthGuard();

  it('should allow request with x-auth header', () => {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: { 'x-auth': 'token' } }),
      }),
    };
    expect(guard.canActivate(context)).toBe(true);
  });

  it('should block request without x-auth header', () => {
    const context: any = {
      switchToHttp: () => ({
        getRequest: () => ({ headers: {} }),
      }),
    };
    expect(guard.canActivate(context)).toBe(false);
  });
});
