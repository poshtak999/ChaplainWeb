import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { LegacyService } from './legacy.service';
import { UpsertPtsrPostDto } from './dto/upsert-ptsr-post.dto';
import { UpsertTextPostDto } from './dto/upsert-text-post.dto';

@Controller('api')
export class LegacyController {
  constructor(private readonly legacyService: LegacyService) {}

  @Get('bible')
  getBiblePosts() {
    return this.legacyService.getBiblePosts();
  }

  @Get('bible/:id')
  getBiblePost(@Param('id', ParseIntPipe) id: number) {
    return this.legacyService.getBiblePost(id);
  }

  @Post('bible')
  createBiblePost(@Body() dto: UpsertTextPostDto) {
    return this.legacyService.createBiblePost(dto);
  }

  @Put('bible/:id')
  updateBiblePost(@Param('id', ParseIntPipe) id: number, @Body() dto: UpsertTextPostDto) {
    return this.legacyService.updateBiblePost(id, dto);
  }

  @Delete('bible/:id')
  deleteBiblePost(@Param('id', ParseIntPipe) id: number) {
    return this.legacyService.deleteBiblePost(id);
  }

  @Get('prayer')
  getPrayerPosts() {
    return this.legacyService.getPrayerPosts();
  }

  @Get('prayer/:id')
  getPrayerPost(@Param('id', ParseIntPipe) id: number) {
    return this.legacyService.getPrayerPost(id);
  }

  @Post('prayer')
  createPrayerPost(@Body() dto: UpsertTextPostDto) {
    return this.legacyService.createPrayerPost(dto);
  }

  @Put('prayer/:id')
  updatePrayerPost(@Param('id', ParseIntPipe) id: number, @Body() dto: UpsertTextPostDto) {
    return this.legacyService.updatePrayerPost(id, dto);
  }

  @Delete('prayer/:id')
  deletePrayerPost(@Param('id', ParseIntPipe) id: number) {
    return this.legacyService.deletePrayerPost(id);
  }

  @Get('ptsr')
  getPtsrPosts() {
    return this.legacyService.getPtsrPosts();
  }

  @Get('ptsr/:id')
  getPtsrPost(@Param('id', ParseIntPipe) id: number) {
    return this.legacyService.getPtsrPost(id);
  }

  @Post('ptsr')
  createPtsrPost(@Body() dto: UpsertPtsrPostDto) {
    return this.legacyService.createPtsrPost(dto);
  }

  @Put('ptsr/:id')
  updatePtsrPost(@Param('id', ParseIntPipe) id: number, @Body() dto: UpsertPtsrPostDto) {
    return this.legacyService.updatePtsrPost(id, dto);
  }

  @Delete('ptsr/:id')
  deletePtsrPost(@Param('id', ParseIntPipe) id: number) {
    return this.legacyService.deletePtsrPost(id);
  }
}
