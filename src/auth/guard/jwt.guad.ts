import { AuthGuard } from '@nestjs/passport';
import { JWT_STRATEGY } from '@/utils/constants';

export class JwtGuard extends AuthGuard(JWT_STRATEGY) {
  constructor() {
    super();
  }
}
