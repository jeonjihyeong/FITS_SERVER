const {DataTypes, Sequelize} = require('sequelize');

const create = async (sequelize) => {
    const commentTable = await sequelize.define('comment', {
        // Model attributes are defined here
        commentIdx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            onDelete: 'CASCADE',
        },
        noteIdx: {
            type: DataTypes.INTEGER,
            references: {
                model: 'note',
                key: 'noteIdx',
            }
        },
        userIdx: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'userIdx',
            }
        },
        comment: {
            type: DataTypes.STRING
        },
        created: {
            type: DataTypes.DATE,
            defalutValue: sequelize.literal('now()')
        },
    }, {
        // Other model options go here   timestamps: false,
        freezeTableName: true,
        timestamps: false,
    });

    commentTable.associate = function (models) {
        commentTable.belongsTo(models.user, {
            foreignKey: 'userIdx',
            onDelete: "CASCADE"
        });
        commentTable.belongsTo(models.note,{ 
            foreignKey: 'noteIdx',
            onDelete: 'CASCADE',
        });
    };

    return commentTable;
}
module.exports = create;  