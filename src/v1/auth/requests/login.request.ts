import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
    @ApiProperty({
        description: 'Tên đăng nhập',
        default: 'admin',
    })
    @IsNotEmpty({
        message: i18nValidationMessage('validation.required', {
            attribute: 'attribute.username',
        }),
    })
    username: string;

    @ApiProperty({
        description: 'Mật khẩu',
        default: '123456',
    })
    @IsNotEmpty({
        message: i18nValidationMessage('validation.required', {
            attribute: 'attribute.password',
        }),
    })
    password: string;
}
