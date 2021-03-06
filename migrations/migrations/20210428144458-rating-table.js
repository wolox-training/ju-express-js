'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ratings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      rating_user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      weet_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'weets',
          key: 'id'
        }
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('ratings', ['rating_user_id', 'weet_id'], {
      name: 'rating_user_id_weet_id_uk',
      unique: true
    });
  },

  down: queryInterface => queryInterface.dropTable('ratings')
};
