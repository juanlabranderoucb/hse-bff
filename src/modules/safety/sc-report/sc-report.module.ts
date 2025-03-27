import { Module } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { ScReportService } from './sc-report.service';
import { ScReportController } from './sc-report.controller';

@Module({
  controllers: [ScReportController],
  providers: [ScReportService, DatabaseService],
  exports: [ScReportService],
})
export class ScReportModule {}
