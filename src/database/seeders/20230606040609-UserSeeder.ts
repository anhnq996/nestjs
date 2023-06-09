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
    // Add your seeder logic here
    await queryInterface.bulkInsert(
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
        {
          name: 'Jane Smith',
          username: 'Anh Ngo',
          password: hash,
          email: 'jane@example.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
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
