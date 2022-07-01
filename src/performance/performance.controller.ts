import {Controller, Get, Logger, Param, Post, Query} from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse, ApiTags
} from "@nestjs/swagger";
import { ResponseDto, ResponseListDto } from "../global/DTO/response.dto";
import { PaginationDto } from "../global/DTO/pagination.dto";

@ApiTags('공연/전시 🍿')
@Controller('performance')
export class PerformanceController {
  logger: Logger;

  constructor(
    private performanceService: PerformanceService,
  ) {
    this.logger = new Logger();
    this.performanceService = performanceService;
  }

  @ApiOperation({summary: '공연/전시 데이터 전체 조회 (아이디 참고 용)'})
  @ApiOkResponse({ type: ResponseListDto, description: '공연/전시 리스트' })
  @Get('')
  async findAll(
    @Query() pagination: PaginationDto
  ): Promise<any> {
    const performances = await this.performanceService.findAll(pagination);
    return Object.assign({
      page: pagination.getPageNum(),
      count: performances.length,
      statusCode: 200,
      statusMsg: `성공`,
      data: performances,
    });
  }

  @ApiParam({
    name: 'performanceId',
    required: true,
    description: '조회할 공연 아이디'
  })
  @ApiOperation({summary: '공연/전시 데이터 상세 조회'})
  @ApiOkResponse({ type: ResponseDto, description: '공연/전시 데이터' })
  @Get('/:performanceId')
  async find(@Param('performanceId') id: number): Promise<any> {
    const performance = await this.performanceService.find(id);
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
      data: performance,
    });
  }
}
