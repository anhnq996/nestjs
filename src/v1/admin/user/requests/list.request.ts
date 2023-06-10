import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class UserListRequest {
    @ApiProperty({
        description: 'Từ khóa tìm kiếm',
        default: 'Anh Ngô',
    })
    @IsNotEmpty({
        message: i18nValidationMessage('validation.required', {
            attribute: 'attribute.keyword',
        }),
    })
    keyword: string;

    @ApiProperty({
        description: 'Trạng thái user',
        default: ['ACTIVE'],
    })
    @IsNotEmpty({
        message: i18nValidationMessage('validation.required', {
            attribute: 'attribute.status',
        }),
    })
    status: string;
}
