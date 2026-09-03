import { Module } from '@nestjs/common';
import { FilesUploadService } from './files-upload.service';
import { S3FileStorageService } from './storage/s3-file-storage.service';
import { UploadMultipleFilesUseCase } from './use-cases/upload-multiple-files.usecase';
import { UploadSingleFileUseCase } from './use-cases/upload-single-file.usecase';
import { DeleteFileByUrlUseCase } from './use-cases/delete-file-by-url.usecase';

@Module({
    providers: [
        FilesUploadService,
        S3FileStorageService,
        DeleteFileByUrlUseCase,
        UploadSingleFileUseCase,
        UploadMultipleFilesUseCase,
    ],
    exports: [FilesUploadService],
})
export class FilesUploadModule {}
