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
   * 아카이브 리스트 조회
   */
  async findAll(userId: number): Promise<Archive[]> {
    this.logger.log('archive 데이터 전체 조회');
    return this.archiveRepository.find();
  }

  /**
   * 아카이브 저장
   */
  async save(archive): Promise<void> {
    this.logger.log('archive 저장');
    await this.archiveRepository.save(archive);
  }
}
