'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'UserId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'Users', //和Users資料表建立關係
        key: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Todos', 'UserId')
  }
};
