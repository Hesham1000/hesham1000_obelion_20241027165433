module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      email: '',
      password: ''
    }
  ]),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
