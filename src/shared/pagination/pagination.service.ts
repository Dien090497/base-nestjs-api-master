import { Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

import { GetRequestParam } from './dtos/request.dto';
import { Pagination } from './interfaces/pagination.interface';
export { GetRequestParam } from './dtos/request.dto';
export { Pagination } from './interfaces/pagination.interface';

@Injectable()
export class PaginateService {
  async paginate<T>(
    options: GetRequestParam,
    queryBuider: SelectQueryBuilder<T>,
  ): Promise<Pagination<T>> {
    const items = await queryBuider
      .limit(options.limit)
      .offset(+options.limit * (+options.page - 1))
      .orderBy(options.sortfield, options.sortby)
      .getMany();

    const totalItems = await queryBuider.getCount();

    return {
      items: items,
      meta: {
        totalItems: totalItems,
        itemCount: items.length,
        itemsPerPage: options.limit,
        totalPages:
          totalItems % options.limit == 0
            ? (totalItems - (totalItems % options.limit)) / options.limit
            : (totalItems - (totalItems % options.limit)) / options.limit + 1,
        currentPage: options.page,
      },
    };
  }
}
