import { Injectable } from '@nestjs/common';
import { Performance } from "./performance.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance) private performanceRepository: Repository<Performance>,
  ) {
    this.performanceRepository = performanceRepository;
  }

  /**
   * 공연전시 리스트 조회
   */
  findAll(): Promise<Performance[]> {
    return this.performanceRepository.find();
  }
}
