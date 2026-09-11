import { Module } from '@nestjs/common';
import { HomeController } from './home.controller.js';

// Feature module: groups everything related to the home route
@Module({
  controllers: [HomeController],
})
export class HomeModule {}