import { Module } from '@nestjs/common';

import { PaginateService } from './pagination.service';

@Module({
  providers: [PaginateService],
  exports: [PaginateService],
})
export class PaginationModule {}
