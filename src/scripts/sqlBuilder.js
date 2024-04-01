import dbConf from "../types/dbConf.js";
import dbMap from "../adapter/dbMap.js";

function generateSQL(inputData, actionType) {
    // 遍历 inputData整理出我们需要的信息收集到info对象中, 以便后续生成SQL, info对象的结构为{label: [selected]}
    //例如: info: {
    //   "是否大表": "否",
    //   "数据库名": "testDB",
    //   "表名": "test_user",
    //   "字段名": "add_col",
    //   "字段长度": "32",
    //   "设置默认值": "2",
    //   "字段精度": "2",
    //   "字段类型": "STDdouble",
    //   "目标数据库": [
    //     "达梦",
    //     "MySQL",
    //     "Oracle",
    //     "TD-SQL"
    //   ]
    // }
    const result = [];
    const info = {};
    //Todo: 设计上有问题, 传入的随机id仍然无法保证唯一性----因为提取用户输入的数据时仍然是根据label来提取的, 但是label是可以重复的
    // 考虑提取为{id: "sdfhe2d_e", label: "数据库类型", selected: ["mysql", "oracle"]}, 然后再根据再遍历id来提取数据,根据id,label来确定组件数据的唯一性
    for (let idObj in inputData) {
        if (idObj !== 'undefined' && idObj !== 'null' && idObj !== '' && idObj !== undefined && idObj !== null) {
            info[inputData[idObj].label] = inputData[idObj].selected;
        }
    }

    ///region 旧的提取info对象的方法, 已废弃
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

    // console.log("info:", JSON.stringify(info, null, 2));
    ///endregion

    console.log('info:', JSON.stringify(info, null, 2));

    //首先根据数据库类型获取对应的SQL模板
    const targetDB = info[dbConf.dbType];
    if(targetDB === [] || targetDB === undefined || targetDB === null) {
        throw new Error('目标数据库类型不能为空');
    }



    const historyTable = info[dbConf.hisTableName];
    //遍历数据库--sql模板Map获取到对应的SQL模板函数, 并执行生成SQL
    targetDB.forEach((dbName) => {
        //sqlTemplate是一个函数, 传入info对象, 返回SQL语句
        const sqlTemplate = dbMap[actionType][dbName];

        if (sqlTemplate) {
            const sql = sqlTemplate(info);
            if(historyTable) {
                const historySql = sqlTemplate({...info, [dbConf.tableName]: historyTable});
                result.push({
                    sql,
                    historySql,
                    dbType: dbName,
                });
            } else {
                result.push({
                    sql: sql,
                    dbType: dbName,
                });
            }


        } else {
            console.log(`${actionType} Function for ${dbName} not found in dbMap.js.`);
        }
    });
    return result;
}

export default {
    generateSQL
}

