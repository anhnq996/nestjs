'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const role2permission = {
      Admin: [
        // users
        'user-view',
        'user-create',
        'user-update',
        'user-delete',

        // post
        'post-view',
        'post-create',
        'post-update',
        'post-delete',
      ],
      User: [
        // post
        'post-view',
        'post-delete',
        'post-update',
      ],
    };

    const removePermissions = {
      User: ['post-update', 'post-delete'],
    };

    await Promise.all(
      Object.keys(role2permission).map(async (key) => {
        let role = await queryInterface.rawSelect(
          'roles',
          {
            where: {
              name: key,
            },
          },
          ['id'],
        );

        if (!role) {
          role = await queryInterface.bulkInsert(
            'roles',
            [
              {
                name: key,
                createdAt: new Date(),
                updatedAt: new Date(),
              },
            ],
            {
              returning: true,
            },
          );
        }

        let permissions = role2permission[key] || [];
        await Promise.all(
          permissions.map(async (permission) => {
            let permit = await queryInterface.rawSelect(
              'permissions',
              {
                where: {
                  name: permission,
                },
              },
              ['id'],
            );

            if (!permit) {
              permit = await queryInterface.bulkInsert(
                'permissions',
                [
                  {
                    name: permission,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  },
                ],
                {
                  returning: true,
                },
              );
            }

            let rolePermission = await queryInterface.rawSelect(
              'role_has_permissions',
              {
                where: {
                  role_id: role,
                  permission_id: permit,
                },
              },
              ['id'],
            );

            if (!rolePermission) {
              await queryInterface.insert(null, 'role_has_permissions', {
                role_id: role,
                permission_id: permit,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }
          }),
        );
      }),
    );
    await Promise.all(
      Object.keys(removePermissions).map(async (role) => {
        let roleId = await queryInterface.rawSelect(
          'roles',
          {
            where: {
              name: role,
            },
          },
          ['id'],
        );

        let permissions = removePermissions[role] || [];
        let permits = await queryInterface.select(
          null,
          'permissions',
          {
            where: {
              name: { [Sequelize.Op.in]: permissions },
            },
          },
          ['id', 'name'],
        );
        let permitIds = permits.map((result) => {
          // Extract the IDs from the result
          return result.id;
        });

        await queryInterface.bulkDelete(
          'role_has_permissions',
          {
            [Sequelize.Op.and]: {
              role_id: roleId,
              permission_id: { [Sequelize.Op.in]: permitIds },
            },
          },
          {},
          null,
        );
      }),
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
