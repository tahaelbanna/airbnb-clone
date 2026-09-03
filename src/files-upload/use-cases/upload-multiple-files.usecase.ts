import { Injectable } from '@nestjs/common';
import { S3FileStorageService } from '../storage/s3-file-storage.service';
import { MulterFile } from '../types/file-type.types';

@Injectable()
export class UploadMultipleFilesUseCase {
    constructor(private readonly s3FileStorageService: S3FileStorageService) {}
    async execute(files: MulterFile[]): Promise<string[]> {
        const uploadPromises: Promise<string>[] = files.map(
            (file): Promise<string> =>
                this.s3FileStorageService.uploadSingleFile(file),
        );
        return Promise.all(uploadPromises);
    }
}
