import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly bucketName = 'products';

  constructor(private readonly supabase: SupabaseService) {}

  async uploadImage(file: Express.Multer.File): Promise<string> {
    try {
      // Generate unique filename
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await this.supabase
        .getStorage()
        .from(this.bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: urlData } = this.supabase
        .getStorage()
        .from(this.bucketName)
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async deleteImage(path: string): Promise<void> {
    try {
      // Extract path from URL if full URL provided
      let filePath = path;
      if (path.includes(this.bucketName)) {
        const parts = path.split(`${this.bucketName}/`);
        filePath = parts[parts.length - 1];
      }

      const { error } = await this.supabase
        .getStorage()
        .from(this.bucketName)
        .remove([filePath]);

      if (error) {
        throw new Error(`Delete failed: ${error.message}`);
      }
    } catch (error) {
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  async uploadMultiple(files: Express.Multer.File[]): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }
}
