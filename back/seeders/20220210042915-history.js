'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Histories', [
      {
        active:true,
        rentBookId: 1,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        active:true,
        rentBookId: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        active:true,
        rentBookId: 3,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Histories', null, {});
  }
};

