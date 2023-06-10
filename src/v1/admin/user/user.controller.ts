import { Controller, Get, Post, Query, Res, Response, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { response } from '@helpers/utils.helpers';
import { UserListRequest } from './requests/list.request';
import { I18nService } from 'nestjs-i18n';
import { AuthGuard } from '../../../providers/auth.guard';
import { PermissionGuard } from '../../../providers/permission.guard';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserResource from '../../auth/resources/login.resource';

@Controller({
    version: '1',
    path: 'admin/users',
})
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService, private readonly i18n: I18nService) {}

    @Get('list')
    @ApiBearerAuth()
    @ApiTags('admin/users')
    @ApiResponse({
        status: 200,
        description: 'The found record',
    })
    @ApiResponse({
        status: 401,
        description: 'Phiên đăng nhập không hợp lệ',
    })
    @UseGuards(PermissionGuard)
    async login(@Query() listRequest: UserListRequest, @Res() res: Response) {
        return response(res, this.i18n, null, 'E1001');
        return this.userService.list(listRequest);
    }
}
