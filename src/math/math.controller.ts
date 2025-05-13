import { Controller, Get, Query, UseGuards, UseFilters } from '@nestjs/common';
import { MathService } from './math.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { HttpErrorFilter } from '../common/filters/http-error.filter';

@Controller('math')
@UseGuards(AuthGuard)
@UseFilters(new HttpErrorFilter())
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @Get('add')
  add(
    @Query('a', ParseIntPipe) a: number,
    @Query('b', ParseIntPipe) b: number,
  ) {
    return this.mathService.add(a, b);
  }
}
