'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * 
    */
    await queryInterface.bulkInsert('User',
      [
        {
          email: 'John Doe',
          password: '123',
          username: 'faker1'
        },
        {
          email: 'John Doe2',
          password: '123',
          username: 'faker12'
        },
        {
          email: 'John Doe3',
          password: '123',
          username: 'faker123'
        },
      ]
      , {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
