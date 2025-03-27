import { Module } from '@nestjs/common';

import { DatabaseService } from '../../database/database.service';
import { ScReportService } from './sc-report.service';
import { ScReportController } from './sc-report.controller';
import { ScReportImpactService } from './sc-report-impact.service';

@Module({
  controllers: [ScReportController],
  providers: [ScReportService, ScReportImpactService, DatabaseService],
  exports: [ScReportService],
})
export class ScReportModule {}
