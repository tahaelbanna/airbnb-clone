import { PipeTransform, Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { BadRequestException } from '../error-handling/custom-exceptions/bad-request.exception';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
    transform(value: string): string {
        const isValid = Types.ObjectId.isValid(value);
        if (!isValid) {
            throw new BadRequestException(
                'Validation failed (valid ObjectId is expected)',
            );
        }
        return value;
    }
}
