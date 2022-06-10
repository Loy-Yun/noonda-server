import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Archive } from "./archive.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArchiveService {
  logger: Logger;

  constructor(
    @InjectRepository(Archive) private archiveRepository: Repository<Archive>,
  ) {
    this.logger = new Logger();
    this.archiveRepository = archiveRepository;
  }

  /**
   * 공연전시 리스트 조회
   */
  async findAll(): Promise<Archive[]> {
    this.logger.log('archive 데이터 전체 조회');
    return this.archiveRepository.find({});
  }
}
