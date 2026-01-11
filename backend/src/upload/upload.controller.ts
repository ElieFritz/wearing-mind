import { Controller, Post, UploadedFile, UseInterceptors, HttpException, HttpStatus, Delete, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    try {
      const url = await this.uploadService.uploadImage(file);
      return {
        success: true,
        url,
        message: 'Image uploaded successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to upload image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('image')
  async deleteImage(@Body('path') path: string) {
    if (!path) {
      throw new HttpException('No path provided', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.uploadService.deleteImage(path);
      return {
        success: true,
        message: 'Image deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete image',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
