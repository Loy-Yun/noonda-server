import { Controller, Get } from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import { Performance } from "./performance.entity";

@Controller('performance')
export class PerformanceController {
  constructor(
    private performanceService: PerformanceService,
  ) {
    this.performanceService = performanceService;
  }

  @Get('')
  async findAll(): Promise<Performance[]> {
    const performances = await this.performanceService.findAll();
    return Object.assign({
      data: performances,
      statusCode: 200,
      statusMsg: `성공`,
    });
  }

}
