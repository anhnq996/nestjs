// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = 'Gmo12345';
    const appKey = process.env.APP_KEY;
    const hash = await bcrypt.hash(`${password}_${appKey}`, 10);
    let roles = await queryInterface.select(
      null,
      'roles',
      {
        where: {
          name: { [Sequelize.Op.in]: ['Admin', 'User'] },
        },
      },
      ['id'],
    );
    let roleByName = {};

    roles.map((role) => {
      roleByName[role.name] = role.id;
    });

    let adminId = await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Anh Ngo',
          username: 'admin',
          password: hash,
          email: 'anhnq1@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      },
    );

    await queryInterface.insert(null, 'user_has_roles', {
      role_id: roleByName.Admin,
      user_id: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    let userId = await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Jane Smith',
          username: 'Anh Ngo',
          password: hash,
          email: 'jane@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      },
    );

    await queryInterface.insert(null, 'user_has_roles', {
      role_id: roleByName.User,
      user_id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
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
