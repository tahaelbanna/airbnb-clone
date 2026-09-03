import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from '../../common/configuration/environment.interface';
import { MulterFile } from '../../files-upload/types/file-type.types';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'node:stream';
import bytes from 'bytes';
import { BadRequestException } from '../../common/error-handling/custom-exceptions/bad-request.exception';
import { I18nService } from 'nestjs-i18n/dist/services/i18n.service';

@Injectable()
export class S3FileStorageService {
    private s3Client: S3;
    private bucketName: string;
    private endpoint: string;
    private region: string;
    private accessKeyId: string;
    private secretAccessKey: string;

    constructor(
        private readonly configService: ConfigService<EnvironmentInterface>,
        private readonly i18NService: I18nService,
    ) {
        this.bucketName = this.configService.get<string>(
            'awsS3.awsS3BucketName',
            { infer: true },
        );
        this.endpoint = this.configService.get<string>('awsS3.minioEndpoint', {
            infer: true,
        });
        this.region = this.configService.get<string>('awsS3.awsS3Region', {
            infer: true,
        });
        this.accessKeyId = this.configService.get<string>(
            'awsS3.awsS3AccessKeyId',
            { infer: true },
        );
        this.secretAccessKey = this.configService.get<string>(
            'awsS3.awsS3SecretAccessKey',
            { infer: true },
        );
        this.s3Client = new S3({
            endpoint: this.endpoint,
            forcePathStyle: Boolean(this.endpoint),
            region: this.region,
            credentials: {
                accessKeyId: this.accessKeyId,
                secretAccessKey: this.secretAccessKey,
            },
        });
    }

    async uploadSingleFile(file: MulterFile): Promise<string> {
        const uniqueFileName = this.generateUniqueFileName(file);
        const upload = new Upload({
            client: this.s3Client,
            params: {
                Bucket: this.bucketName,
                Key: uniqueFileName,
                Body: Readable.from(file.buffer),
                ContentType: file.mimetype,
            },
            // sending up to 4 chunks in parallel
            queueSize: 4,
            // min chunk size = 5  MB
            partSize: bytes('5MB'),
        });
        // upload.on('httpUploadProgress', (progress) => { // event listener for upload progress
        //     console.log('Upload progress:', progress);
        // });
        try {
            const result = await upload.done();
            return result.Location; // return file url
        } catch {
            throw new BadRequestException(
                this.i18NService.translate('files.FILE_UPLOAD_FAILED'),
            );
        }
    }

    private generateUniqueFileName(file: MulterFile): string {
        const fileName = `${Date.now()}-${file.originalname ?? file.filename}`;
        return fileName;
    }
}
