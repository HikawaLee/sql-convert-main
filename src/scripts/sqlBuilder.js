import dbConf from "../types/dbConf.js";
import dbMap from "./dbMap.js";

function generateSQL(inputData, actionType) {
    // 遍历 inputData，整理出我们需要的信息
    const result = [];
    const info = {};
    for (let id in inputData) {
        if (id !== 'undefined' && id !== 'null' && id !== '' && id !== undefined && id !== null) {
            info[inputData[id].label] = inputData[id].selected;
        }
    }
    // 使用 Object.keys() 获取对象的键
    // const keysArray = Object.keys(inputData).filter(key => key !== undefined
    //     && key !== null && key !== '' && key !== 'undefined' && key !== 'null')
    // const infoArr = keysArray.map(key => {
    //     const subObj = inputData[key];
    //     return {
    //         ...subObj,
    //         // id: key,
    //     }
    // });
    // console.log('infoArr:', JSON.stringify(infoArr, null, 2));
    //获取目标数据库类型并生成SQL
    // const targetDB = infoArr.find(item => item.label === dbConf.dbType).selected;

    console.log("info:", JSON.stringify(info, null, 2));

    const targetDB = info[dbConf.dbType];
    if(targetDB === [] || targetDB === undefined || targetDB === null) {
        throw new Error('目标数据库类型不能为空');
    }

    targetDB.forEach((dbName) => {
        const sqlTemplate = dbMap[actionType][dbName];

        if (sqlTemplate) {
            const sql = sqlTemplate(info);
            result.push({
                sql: sql,
                dbType: dbName
            });
        } else {
            console.log(`Function for ${dbName} not found in dbMap.js.`);
        }
    });
    return result;
}

export default {
    generateSQL
}

