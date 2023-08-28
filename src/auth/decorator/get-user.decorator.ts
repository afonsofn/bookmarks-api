import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Creating an custom decorator that fetch the user data
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // extracting a request from express
    const request: Express.Request = ctx.switchToHttp().getRequest();

    // this is to fetch a specific field
    if (data) return request.user[data];

    return request.user;
  },
);
