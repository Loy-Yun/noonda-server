import {Body, Controller, Get, Logger, Post, Query} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ArchiveService } from "./archive.service";
import { ResponseDto, ResponseListDto } from "../global/DTO/response.dto";
import {Archive, ArchiveSaveRequestDTO} from "./archive.entity";

@ApiTags('아카이빙 🎫')
@Controller('archive')
export class ArchiveController {
  logger: Logger;

  constructor(
    private archiveService: ArchiveService,
  ) {
    this.logger = new Logger();
    this.archiveService = archiveService;
  }

  @ApiOperation({summary: '유저 아카이브 전체 조회'})
  @ApiOkResponse({ type: ResponseListDto, description: '아카이브 리스트' })
  @Get('')
  async findAll(): Promise<any> {
    const archives = await this.archiveService.findAll(1);
    return Object.assign({
      count: archives.length,
      statusCode: 200,
      statusMsg: `성공`,
      data: archives,
    });
  }

  @ApiOperation({summary: '유저 아카이브 저장'})
  @ApiOkResponse({ type: ResponseDto, description: '아카이브 리스트' })
  @Post('')
  async saveOne(
    @Body() archive: ArchiveSaveRequestDTO
  ): Promise<any> {
    const archives = await this.archiveService.save(archive);
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`
    });
  }

}
