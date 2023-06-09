import { Injectable } from '@nestjs/common';
import { UserListRequest } from './requests/list.request';

@Injectable()
export class UserService {
  list(listRequest: UserListRequest) {
    return 'This action adds a new auth';
  }
}
