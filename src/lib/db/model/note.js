const {DataTypes, Sequelize} = require('sequelize');

const create = async (sequelize) => {
    const noteTable = await sequelize.define('note', {
        // Model attributes are defined here
        noteIdx: {
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
        title: {
            type: DataTypes.STRING
        },
        content: {
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

    noteTable.associate = function (models) {
        noteTable.belongsTo(models.user,{ 
            foreignKey: 'userIdx',
            onDelete: "CASCADE"
        });
        noteTable.hasMany(models.comment,{ 
            foreignKey: 'noteIdx',
        });
        noteTable.hasMany(models.like,{ 
            foreignKey: 'noteIdx',
        });
    };

    return noteTable;
}
module.exports = create;  