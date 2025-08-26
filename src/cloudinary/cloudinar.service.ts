/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
// src/cloudinary/cloudinar.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import toStream from 'buffer-to-stream';

// ✅ تحديد النوع ليكون أكثر وضوحًا
interface CloudinaryUploadResult {
  secure_url: string;
  // يمكن إضافة المزيد من الخصائص إذا احتجتها
  // public_id: string;
}

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dxtjxxjbx',
      api_key: '377916524128891',
      api_secret: 'MG9sntVfaq_aFfOlGSRZcnQRioI',
    });
  }

  async uploadFile(file: any): Promise<string> {
    try {
      // ✅ تحديد نوع الـ Promise هنا
      const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'menu_items' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            // ✅ تمرير النتيجة والتأكد من أنها من النوع الصحيح
            resolve(result as CloudinaryUploadResult);
          },
        );

        toStream(file.buffer).pipe(uploadStream);
      });

      return result.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error('Could not upload file to Cloudinary.');
    }
  }
}