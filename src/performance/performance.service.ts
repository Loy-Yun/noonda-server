import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {Performance} from "./performance.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {PaginationDto} from "../global/DTO/pagination.dto";
import any = jasmine.any;

@Injectable()
export class PerformanceService {
  logger: Logger;

  constructor(
    @InjectRepository(Performance) private performanceRepository: Repository<Performance>,
  ) {
    this.logger = new Logger();
    this.performanceRepository = performanceRepository;
  }

  /**
   * 공연전시 필터 목록 조회
   */
  async findFilter(): Promise<any> {
    this.logger.log('performance 필터 조회');
    let filters = {
      category: [],
      area: []
    }
    const result = await this.performanceRepository
      .createQueryBuilder('performance')
      .select([
        'performance.area',
        'performance.category'
      ])
      .getRawMany();

    result.forEach(r => {
      if(r.performance_area && filters.area.indexOf(r.performance_area) === -1) {
        filters.area = [...filters.area, r.performance_area];
      }
      if(r.performance_category && filters.category.indexOf(r.performance_category) === -1) {
        filters.category = [...filters.category, r.performance_category];
      }
    })

    return filters;
  }

  /**
   * 공연전시 리스트 조회
   */
  async findAll(pagination: PaginationDto): Promise<Performance[]> {
    this.logger.log('performance 데이터 전체 조회');
    return this.performanceRepository.find({
      skip: pagination.getSkip(),
      take: pagination.getTake()
    });
  }

  /**
   * 공연전시 상세 조회
   */
  async find(id: number): Promise<Performance> {
    this.logger.log('performance 상세 조회');
    return await this.performanceRepository.update(id, {
      views: () => 'views + 1',
    }).then(res => res.raw[0]);
  }

  /**
   * 공연전시 컬렉션 조회
   */
  async findPerformanceCollection(collection: string, userId: number): Promise<Performance[]> {
    this.logger.log('performance 컬렉션 조회');
    let query = "";
    switch (collection) {
      case 'popular':
        query = "performance.views";
        break;

      case 'new':
        query = "performance.id";
        break;

      default:
        throw new HttpException(
          {
            code: HttpStatus.BAD_REQUEST,
            message: '잘못된 collection name 입니다.'
          },
          HttpStatus.BAD_REQUEST
        );
    }
    return this.performanceRepository
      .createQueryBuilder('performance')
      .orderBy(query, 'DESC')
      .limit(10)
      .getMany();
  }

  /**
   * 공연전시 장르 컬렉션 조회
   */
  async findGenreCollection(collection: string, userId: number): Promise<any[]> {
    this.logger.log('performance 장르 컬렉션 조회');
    let result = [];
    result = await this.performanceRepository
      .createQueryBuilder('performance')
      .select('performance.category')
      .orderBy('RAND()')
      .groupBy('performance.category')
      .limit(4)
      .getMany();
    result = await Promise.all(result.map(async (r, index) => {
      if (index > 1) {
        r.performance = await this.performanceRepository
          .createQueryBuilder('performance')
          .where('category = (:category)', { category: r.category })
          .limit(10)
          .getMany();
      }
      return r;
    }));
    return result;
  }

  /**
   * 필터링 된 공연전시 조회
   */
  async findFilteredList(category: string[], area: string[]): Promise<Performance[]> {
    this.logger.log('필터링 된 performance 조회');
    const query = (category?.length > 0 && area?.length > 0) ? "area IN (:area) AND category IN (:category)" : "area IN (:area) OR category IN (:category)"
    return this.performanceRepository
      .createQueryBuilder('performance')
      .where(query, { area: area?.length > 0 ? area : null, category: category?.length > 0 ? category : null })
      .getMany();
  }

  /**
   * 공연전시 검색
   */
  async search(term: string): Promise<Performance[]> {
    this.logger.log(`performance 검색 ${term}`);
    return this.performanceRepository.find({
      where: [
        { title: Like(`%${term}%`) },
        { category: Like(`%${term}%`) },
        { place: Like(`%${term}%`) }
      ]
    })
  }
}
