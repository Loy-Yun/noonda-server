import { Controller, Post } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import {
  ApiExcludeEndpoint,
  ApiOperation,
} from "@nestjs/swagger";

@Controller('performance')
export class PerformanceController {
  constructor(
    private performanceService: PerformanceService,
  ) {
    this.performanceService = performanceService;
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
