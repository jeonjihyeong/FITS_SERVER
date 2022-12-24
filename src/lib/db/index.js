const { Sequelize, Op, Model}= require('sequelize');
const { modelDefines, modelList } = require('./model');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const models = {};

// const env = process.env.NODE_ENV || 'local';

const initialize = async () => {
    const sequelize = new Sequelize( config.database, config.dialect, config.password,
        {
            host: 'localhost',
            dialect: 'postgres',
        }
    )

    const modelInit = async () =>{
        for(let i =0; i <modelList.length; i++){
            models[modelList[i]] = await modelDefines[modelList[i]](sequelize);
        }
    }
    const relationInit = async () => {
        for (let i = 0; i < modelList.length; i++) {
            models[modelList[i]].associate(models)
        }
    }

    try {
        await sequelize.authenticate();
    } catch (err) {
        console.log(err)
    }
    await modelInit();
    await relationInit();
    console.log('db connection success')
}

module.exports = {
    initialize,
    models,
    Op
}