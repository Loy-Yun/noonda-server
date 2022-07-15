import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Collection} from "./collection.entity";

@Injectable()
export class CollectionService {
  logger: Logger;

  constructor(
    @InjectRepository(Collection) private collectionRepository: Repository<Collection>,
  ) {
    this.logger = new Logger();
    this.collectionRepository = collectionRepository;
  }

  /**
   * 컬랙션 리스트 조회
   */
  async findAll(): Promise<Collection[]> {
    this.logger.log('collection 데이터 조회');
    return this.collectionRepository.find();
  }
}
