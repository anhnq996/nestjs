import { Request } from 'express';
import { UserModel } from '@models/User.model';

interface RequestWithUser extends Request {
  user: UserModel;
}

export default RequestWithUser;
