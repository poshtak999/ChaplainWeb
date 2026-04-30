import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpsertPtsrPostDto } from './dto/upsert-ptsr-post.dto';
import { UpsertTextPostDto } from './dto/upsert-text-post.dto';

@Injectable()
export class LegacyService {
  constructor(private readonly prisma: PrismaService) {}

  getBiblePosts() {
    return this.prisma.biblePost.findMany({ orderBy: { id: 'asc' } });
  }

  async getBiblePost(id: number) {
    const post = await this.prisma.biblePost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  createBiblePost(dto: UpsertTextPostDto) {
    return this.prisma.biblePost.create({ data: dto });
  }

  async updateBiblePost(id: number, dto: UpsertTextPostDto) {
    await this.getBiblePost(id);
    return this.prisma.biblePost.update({ where: { id }, data: dto });
  }

  async deleteBiblePost(id: number) {
    await this.getBiblePost(id);
    await this.prisma.biblePost.delete({ where: { id } });
    return { message: 'Post deleted successfully' };
  }

  getPrayerPosts() {
    return this.prisma.prayerPost.findMany({ orderBy: { id: 'asc' } });
  }

  async getPrayerPost(id: number) {
    const post = await this.prisma.prayerPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  createPrayerPost(dto: UpsertTextPostDto) {
    return this.prisma.prayerPost.create({ data: dto });
  }

  async updatePrayerPost(id: number, dto: UpsertTextPostDto) {
    await this.getPrayerPost(id);
    return this.prisma.prayerPost.update({ where: { id }, data: dto });
  }

  async deletePrayerPost(id: number) {
    await this.getPrayerPost(id);
    await this.prisma.prayerPost.delete({ where: { id } });
    return { message: 'Post deleted successfully' };
  }

  getPtsrPosts() {
    return this.prisma.ptsrPost.findMany({ orderBy: { id: 'asc' } });
  }

  async getPtsrPost(id: number) {
    const post = await this.prisma.ptsrPost.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  createPtsrPost(dto: UpsertPtsrPostDto) {
    return this.prisma.ptsrPost.create({
      data: {
        title: dto.title,
        sections: dto.sections as Prisma.InputJsonValue,
      },
    });
  }

  async updatePtsrPost(id: number, dto: UpsertPtsrPostDto) {
    await this.getPtsrPost(id);
    return this.prisma.ptsrPost.update({
      where: { id },
      data: {
        title: dto.title,
        sections: dto.sections as Prisma.InputJsonValue,
      },
    });
  }

  async deletePtsrPost(id: number) {
    await this.getPtsrPost(id);
    await this.prisma.ptsrPost.delete({ where: { id } });
    return { message: 'Post deleted successfully' };
  }
}
