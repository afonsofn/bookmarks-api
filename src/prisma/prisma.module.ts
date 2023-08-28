import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// If you dont want to import some module everytime in each module that you want to use it just need to turn global (@Global()) and will be available to all modules
@Global()
@Module({
  providers: [PrismaService],
  // If you want to use a service from an module you need to export it
  // You dont need to export only you will use only in the module it self
  exports: [PrismaService],
})
export class PrismaModule {}
