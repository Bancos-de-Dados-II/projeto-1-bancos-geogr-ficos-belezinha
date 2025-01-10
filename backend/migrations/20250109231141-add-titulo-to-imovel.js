import { Sequelize } from 'sequelize';  // ESM
export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('imovels', 'titulo', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('imovels', 'titulo');
  },
};
