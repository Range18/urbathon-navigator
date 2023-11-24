import { Body, Controller, Get, Param } from '@nestjs/common';
import { VerificationService } from './verification.service';

@Controller()
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get('verify/:code')
  async verify(@Param('code') code: string): Promise<void> {
    await this.verificationService.verify(code);
  }
}
