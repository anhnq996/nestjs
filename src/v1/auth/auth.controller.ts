import { Body, Controller, Post, Res, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './requests/login.request';
import { response } from '@helpers/utils.helpers';
import { I18nService } from 'nestjs-i18n';
import RoleGuard from '../../providers/role.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({
    version: '1',
    path: 'auth',
})
@UseGuards(RoleGuard('admin'))
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly i18n: I18nService) {}

    @ApiTags('auth/login')
    @Post('login')
    @ApiResponse({
        status: 200,
        schema: {
            example: {
                code: 'S1000',
                message: 'Thành công',
                data: {
                    id: 1,
                    name: 'Anh Ngô',
                    email: 'ngoquocanh111@gmail.com',
                    roles: ['Admin'],
                    createdAt: '2023-06-01 00:00:00',
                    updatedAt: '2023-06-01 00:00:00',
                },
            },
        },
    })
    @ApiResponse({
        status: 401,
        schema: {
            example: {
                code: 'E1003',
                message: 'Phiên đăng nhập không hợp lệ',
            },
        },
    })
    async login(@Body() request: LoginRequest, @Res() res: Response) {
        const result = await this.authService.login(request);
        return response(res, this.i18n, result.data, result.code);
    }
}
