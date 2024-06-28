import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { files } = value;

    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    files.forEach(file => {
      // Exemples de validations :
      // Taille maximale du fichier en octets (par exemple 1 Mo = 1 * 1024 * 1024 octets)
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new BadRequestException(`File ${file.originalname} is too large`);
      }

      // Types de fichier autorisés
      const allowedMimeTypes = ['image/jpeg', 'application/pdf'];
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(`File ${file.originalname} has an invalid file type`);
      }
    });

    return value;
  }
}
