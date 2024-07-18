import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/share/guards/auth.guard';
import { RoleGuard } from 'src/share/guards/role.guard';

@Controller('/dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard)
  @Get('/sold-product')
  @HttpCode(200)
  async soldProductController() {
    return await this.dashboardService.soldProductService();
  }

  @Get('/total-revenue')
  @HttpCode(200)
  async totalRevenueController() {
    return await this.dashboardService.totalRevenueService();
  }
}
