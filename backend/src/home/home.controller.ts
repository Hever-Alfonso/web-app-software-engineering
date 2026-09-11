import { Controller, Get } from '@nestjs/common';

// Controller for the API root route
@Controller()
export class HomeController {
  // Handles GET /api and returns a plain text status message
  @Get()
  index(): string {
    return 'API is running';
  }
}