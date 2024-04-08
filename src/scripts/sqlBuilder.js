import dbConf from "../types/dbConf.js";
import dbMap from "../adapter/dbMap.js";
function generateSQL(inputData, actionType) {
    // 遍历 inputData整理出我们需要的信息收集到userData对象中, 以便后续生成SQL, userData对象的结构为{label: [selected]}
    // 例如: userData: {
    //     "数据库名": "dbtrade",
    //         "表名": "test_user",
    //         "历史表名": "histest_user",
    //         "生成历史表": "否",
    //         "字段名": "t_id",
    //         "字段类型": "HsAddress",
    //         "目标数据库": [
    //         "MySQL",
    //         "Oracle"
    //     ]
    // }
    const result = [];
    const userData = {};
    //Todo: 设计上有问题, 传入的随机id仍然无法保证唯一性----因为提取用户输入的数据时仍然是根据label来提取的, 但是label是可以重复的
    // 考虑提取为{id: "sdfhe2d_e", label: "数据库类型", selected: ["mysql", "oracle"]}, 然后再根据再遍历id来提取数据,根据id,label来确定组件数据的唯一性
    for (let idObj in inputData) {
        if (idObj !== 'undefined' && idObj !== 'null' && idObj !== '' && idObj !== undefined && idObj !== null) {
            userData[inputData[idObj].label] = inputData[idObj].selected;
        }
    }
    
    console.log('userData:', JSON.stringify(userData, null, 2));




    //首先根据数据库类型获取对应的SQL模板
    const targetDB = userData[dbConf.dbType];
    if(targetDB === [] || targetDB === undefined || targetDB === null) {
        throw new Error('目标数据库类型不能为空');
    }

    //如果生成历史表, 则历史表名不能为空
    const historyTable = userData[dbConf.hisTableName];
    const genHistoryTable = userData[dbConf.genHistoryTable];
    if(genHistoryTable && !historyTable) {
        throw new Error('生成历史表时, 历史表名不能为空');
    }


    //遍历数据库--sql模板Map获取到对应的SQL模板函数, 并执行生成SQL
    targetDB.forEach((dbName) => {
        //sqlTemplate是一个函数, 传入userData对象, 返回SQL语句
        const sqlTemplate = dbMap[actionType][dbName];

        if (sqlTemplate) {
            const sql = sqlTemplate(userData);

            if(historyTable && genHistoryTable === '是') {
                const historySql = sqlTemplate({...userData, [dbConf.tableName]: historyTable});
                result.push({
                    sqls: [
                        {
                            label: dbConf.originTableSQL,
                            sql: sql,
                        },
                        {
                            label: dbConf.historyTableSQL,
                            sql: historySql,
                        },
                    ],
                    dbType: dbName,
                });
            } else {
                result.push({
                    sqls: [
                        {
                            label: dbConf.originTableSQL,
                            sql: sql,
                        },
                    ],
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

