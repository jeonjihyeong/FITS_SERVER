const {DataTypes, Sequelize} = require('sequelize');

const create = async (sequelize) => {
    const likeTable = await sequelize.define('like', {
        // Model attributes are defined here
        likeIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'CASCADE',
        },
        userIdx: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'userIdx',
            }
        },
        noteIdx: {
            type: DataTypes.INTEGER,
            references: {
                model: 'note',
                key: 'noteIdx',
            }
        },
    }, {
        // Other model options go here   timestamps: false,
        freezeTableName: true,
        timestamps: false,
    });

    likeTable.associate = function (models) {
        likeTable.belongsTo(models.user, {
            foreignKey: 'userIdx',
            onDelete: "CASCADE"
        });
        likeTable.belongsTo(models.note, {
            foreignKey: 'userIdx',
            onDelete: "CASCADE"
        });
    };

    return likeTable;
}
module.exports = create;  