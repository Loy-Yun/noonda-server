import {Body, Controller, Get, Logger, Post} from '@nestjs/common';
import {ApiBody, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {PerformanceFilterDTO} from "../performance/performance.entity";
import {ResponseListDto} from "../global/DTO/response.dto";
import {ArchiveService} from "../archive/archive.service";
import {CollectionService} from "./collection.service";

@ApiTags('컬랙션 📁')
@Controller('collection')
export class CollectionController {
  logger: Logger;

  constructor(
    private collectionService: CollectionService,
  ) {
    this.logger = new Logger();
    this.collectionService = collectionService;
  }

  @ApiOperation({summary: '컬랙션 리스트 조회', description: '홈에서 보여주는 컬랙션들 이름 리스트!! (제목, 부제목, 이름(api 호출용))'})
  @ApiOkResponse({ type: ResponseListDto, description: '컬랙션 데이터 리스트' })
  @Get('/')
  async find() {
    const collections = await this.collectionService.findAll();
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
      data: collections,
    });
  }
}
