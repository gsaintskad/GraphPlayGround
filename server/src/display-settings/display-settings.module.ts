import { Module } from '@nestjs/common';
import { DisplaySettingsController } from './display-settings.controller';

@Module({
  controllers: [DisplaySettingsController]
})
export class DisplaySettingsModule {}
