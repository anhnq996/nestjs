import {
  Controller,
  Get,
  Post,
  Query,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { response } from '@helpers/utils.helpers';
import { UserListRequest } from './requests/list.request';
import { I18nService } from 'nestjs-i18n';
import { AuthGuard } from '../../../providers/auth.guard';
import { PermissionGuard } from '../../../providers/permission.guard';

@Controller({
  version: '1',
  path: 'admin/users',
})
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly i18n: I18nService,
  ) {}

  @Get('list')
  @UseGuards(PermissionGuard)
  async login(@Query() listRequest: UserListRequest, @Res() res: Response) {
    return response(res, this.i18n, null, 'E1001');
    return this.userService.list(listRequest);
  }
}
