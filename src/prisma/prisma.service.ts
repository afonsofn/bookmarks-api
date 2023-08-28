import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// this allow us to inject some dependences in this service, if you will not inject anything dont need it
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // This super its calling the constructor of the extended class "PrismaClient"
    super({
      datasources: {
        db: {
          // Connecting the service file with the database
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
