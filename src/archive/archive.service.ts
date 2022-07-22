import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Archive} from "./archive.entity";
import {Repository} from "typeorm";
import {ArchiveImage} from "../image/entity/archiveImage.entity";
import {User} from "../user/user.entity";

@Injectable()
export class ArchiveService {
  logger: Logger;

  constructor(
    @InjectRepository(Archive) private archiveRepository: Repository<Archive>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    this.logger = new Logger();
    this.archiveRepository = archiveRepository;
    this.userRepository = userRepository;
  }

  /**
   * 아카이브 리스트 조회
   */
  async findAll(userId: number): Promise<Archive[]> {
    this.logger.log('archive 데이터 전체 조회');
    return this.archiveRepository
      .createQueryBuilder('archive')
      .leftJoinAndSelect('archive.images', 'images')
      .where('archive.user = :user', { user: userId })
      .getMany();
  }

  /**
   * 아카이브 저장
   */
  async save(archive): Promise<void> {
    this.logger.log('archive 저장');
    archive.user = await this.userRepository.findOne(1);
    archive.images = archive.images.map(i => {
      const image = new ArchiveImage();
      image.url = i;
      return image;
    });
    const saved = await this.archiveRepository.save(archive);
    await this.archiveRepository.update(saved.id, {cover: saved.images[archive.cover].id});
  }

  /**
   * 아카이브 수정
   */
  async edit(id, request): Promise<Archive> {
    this.logger.log('archive 수정');
    let payload = request;
    const archive = await this.archiveRepository.findOne(id);
    if(payload.cover > -1) {
      payload.cover = archive.images[payload.cover].id;
    }

    return await this.archiveRepository.update(id, payload).then(response => response.raw[0]);
  }
}
