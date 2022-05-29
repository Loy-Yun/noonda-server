import { Controller, Get, Param, Post } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import { Performance, PerformanceDTO } from "./performance.entity";
import {
  ApiExcludeEndpoint,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse
} from "@nestjs/swagger";
import { ResponseDto, ResponseListDto } from "../global/DTO/response.dto";

@Controller('performance')
export class PerformanceController {
  constructor(
    private performanceService: PerformanceService,
  ) {
    this.performanceService = performanceService;
  }

  @ApiOperation({summary: '공연/전시 데이터 전체 조회'})
  @ApiOkResponse({ type: ResponseListDto, description: '공연/전시 리스트' })
  @Get('')
  async findAll(): Promise<any> {
    const performances = await this.performanceService.findAll();
    return Object.assign({
      data: performances,
      statusCode: 200,
      statusMsg: `성공`,
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
      data: performance,
      statusCode: 200,
      statusMsg: `성공`,
    });
  }

  @ApiExcludeEndpoint()
  @ApiOperation({summary: '공연/전시 데이터 밀어넣기'})
  @Post('')
  async saveAll(): Promise<any> {
    await this.performanceService.saveAll();
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
    });
  }

  @ApiExcludeEndpoint()
  @ApiOperation({summary: '공연/전시 상세 데이터 추가하기'})
  @Post('details')
  async saveDetails(): Promise<any> {
    await this.performanceService.saveDetails();
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
    });
  }
}
