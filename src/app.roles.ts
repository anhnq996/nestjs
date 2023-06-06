import { RolesBuilder } from 'nest-access-control';

const permissions = {
  admin: {
    video: {
      'create:any': ['*', '!views'],
      'read:any': ['*'],
      'update:any': ['*', '!views'],
      'delete:any': ['*'],
    },
  },
  user: {
    video: {
      'create:own': ['*', '!rating', '!views'],
      'read:own': ['*'],
      'update:own': ['*', '!rating', '!views'],
      'delete:own': ['*'],
    },
  },
};

export const roles: RolesBuilder = new RolesBuilder();
roles.setGrants(permissions);
