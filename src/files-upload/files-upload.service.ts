import { Injectable } from '@nestjs/common';
import { UploadSingleFileUseCase } from './use-cases/upload-single-file.usecase';
import { UploadMultipleFilesUseCase } from './use-cases/upload-multiple-files.usecase';
import { DeleteFileByUrlUseCase } from './use-cases/delete-file-by-url.usecase';

@Injectable()
export class FilesUploadService {
    constructor(
        private readonly uploadSingleFileUseCase: UploadSingleFileUseCase,
        private readonly uploadMultipleFilesUseCase: UploadMultipleFilesUseCase,
        private readonly deleteFileByUrlUseCase: DeleteFileByUrlUseCase,
    ) {}

    uploadSingleFile() {}

    uploadMultipleFiles() {}

    deleteFileByUrl() {}
}
