import dbConf from "../types/dbConf.js";
import dbMap from "./dbMap.js";

function generateSQL(inputData) {
    // 遍历 inputData，整理出我们需要的信息
    const result = [];
    // 使用 Object.keys() 获取对象的键
    const keysArray = Object.keys(inputData).filter(key => key !== undefined
        && key !== null && key !== '' && key !== 'undefined' && key !== 'null')
    const infoArr = keysArray.map(key => {
        const subObj = inputData[key];
        return {
            ...subObj,
            id: key,
        }
    });
    console.log('infoArr:', JSON.stringify(infoArr, null, 2));
    //获取目标数据库类型并生成SQL
    const dbType = infoArr.find(item => item.label === dbConf.dbType).selected;
    if(dbType === [] || dbType === undefined || dbType === null) {
        throw new Error('目标数据库类型不能为空');
    }
    console.log('dbMap:', JSON.stringify(dbMap, null, 2));
    // dbConf.dbType.forEach((dbName) => {
    //     // Access the correct function based on the database type
    //     const addFunction = dbMap.add[dbName];
    //
    //     // Check if the function exists
    //     if (addFunction) {
    //         // Call the function with the appropriate arguments (infoArr)
    //         const sql = addFunction(infoArr);
    //
    //         // Add the result to the array
    //         result.push({
    //             sql: sql,
    //             dbType: dbName
    //         });
    //     } else {
    //         console.log(`Function for ${dbName} not found in dbMap.add`);
    //     }
    // });
    return result;
}

export default {
    add: generateSQL,
}

