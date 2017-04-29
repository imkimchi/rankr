'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
     Add altering commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.createTable(
        'rank_logs_daum',
        {
          rank_crawl_idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references : "rank_crawl_logs",
            referenceKey : "idx",
            onDelete : "CASCADE"
          },
          title: {
            type: Sequelize.STRING
          },
          rank: {
            type: Sequelize.INTEGER
          },
          status : {
            type : Sequelize.ENUM('up', 'down', 'new')
          },
          value : {
            type : Sequelize.INTEGER,
            allowNull : true
          }
        }
    )

  },

  down: function (queryInterface, Sequelize) {
    /*
     Add reverting commands here.
     Return a promise to correctly handle asynchronicity.

     Example:
     return queryInterface.dropTable('users');
     */

    return queryInterface.dropTable('rank_logs_daum')
  }
};
