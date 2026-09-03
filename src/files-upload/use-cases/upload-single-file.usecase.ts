import { Injectable } from '@nestjs/common';
import { S3FileStorageService } from '../storage/s3-file-storage.service';
import { MulterFile } from '../types/file-type.types';

@Injectable()
export class UploadSingleFileUseCase {
    constructor(private readonly s3FileStorageService: S3FileStorageService) {}
    async execute(file: MulterFile): Promise<string> {
        return this.s3FileStorageService.uploadSingleFile(file);
    }
}
