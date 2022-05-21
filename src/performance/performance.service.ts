import { HttpService, Injectable, Logger } from "@nestjs/common";
import { Performance } from "./performance.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as fs from "fs";
import * as xmlParser from "xml-js";

@Injectable()
export class PerformanceService {
  logger: Logger;

  constructor(
    @InjectRepository(Performance) private performanceRepository: Repository<Performance>,
    private httpService: HttpService
  ) {
    this.logger = new Logger();
    this.performanceRepository = performanceRepository;
  }

  private readonly DATA_URL = `http://www.culture.go.kr/openapi/rest/publicperformancedisplays/d/?ServiceKey=&seq=`;

  /**
   * 공연전시 리스트 조회
   */
  findAll(): Promise<Performance[]> {
    this.logger.log('performance 데이터 전체 조회');
    return this.performanceRepository.find();
  }

  /**
   * 공연전시 저장
   */
  async saveAll(): Promise<void> {
    const jsonFile = fs.readFileSync(__dirname + "/../../src/assets/data/performance.json", "utf8");
    const performances_product = JSON.parse(jsonFile);

    this.logger.log('performance 데이터 밀어넣기');

    for (const performance of performances_product) {
      this.logger.log(performance.title+' 저장...');
      await this.performanceRepository.save(performance);
    }
  }

  /**
   * 공연전시 상세정보 업데이트(가격, 링크, 장소)
   */
  async saveDetails(): Promise<void> {
    const jsonFile = fs.readFileSync(__dirname + "/../../src/assets/data/performance.json", "utf8");
    const performances_product = JSON.parse(jsonFile);

    this.logger.log('performance 상세 데이터 조회 & 업데이트');

    for (const performance of performances_product) {
      this.logger.log(performance.seq+' 찾기...');
      const perToUpdate = await this.performanceRepository.findOne({
        seq: performance.seq,
      })

      const performance_detail = await this.httpService.get(this.DATA_URL+performance.seq).toPromise();
      let xml = performance_detail.data;
      let json = JSON.parse(xmlParser.xml2json(xml, {compact: true}));

      const result = json.response.msgBody.perforInfo;
      perToUpdate.price = result.price._text;
      perToUpdate.link = result.url._text;
      if(!perToUpdate.area) {
        perToUpdate.area = result.placeAddr?._text?.slice(0, 2);
      }

      this.logger.log('변경...');

      await this.performanceRepository.save(perToUpdate);
    }
  }
}
