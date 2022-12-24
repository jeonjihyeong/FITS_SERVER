const {DataTypes, Sequelize} = require('sequelize');

const create = async (sequelize) => {
    const followTable = await sequelize.define('follow', {
        // Model attributes are defined here
        followIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'CASCADE',
        },
        following: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'userIdx',
            }
        },
        follower: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'userIdx',
            }
        },
    }, {
        // Other model options go here   timestamps: false,
        freezeTableName: true,
        timestamps: false,
    });

    followTable.associate = function (models) {
        followTable.belongsTo(models.user, {
            foreignKey: 'following',
            onDelete: "CASCADE"
        });
        followTable.belongsTo(models.user, {
            foreignKey: 'follower',
            onDelete: "CASCADE"
        });
    };

    return followTable;
}
module.exports = create;  