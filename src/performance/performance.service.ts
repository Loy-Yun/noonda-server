import { Injectable, Logger } from "@nestjs/common";
import { Performance } from "./performance.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {PaginationDto} from "../global/DTO/pagination.dto";

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
    return this.performanceRepository.findOne(id);
  }
}
