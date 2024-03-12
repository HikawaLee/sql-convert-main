
// 根据给定的参数生成不同的数据库sql，用于添加列，支持事务, 例如参数为：
//    inputData is:
//       {
//   "Lg_X6iWRgV": { // 该字段的id, 用于获取label和selected, 是随机生成的, 用于区分不同的字段, 在这里没有实际意义, 脚本中需要注意不要硬编码
//     "label": "是否大表",
//     "selected": "否"
//   },
//   "xfuzUAkckV": {
//     "label": "数据库名",
//     "selected": "test_db"
//   },
//   "MeBubCr0R6": {
//     "label": "表名",
//     "selected": "test_user"
//   },
//   "WbY5RxAoI_": {
//     "label": "字段名",
//     "selected": "user_id"
//   },
//   "8QEinkw75f": {
//     "label": "测试多个多选框",
//     "selected": []
//   },
//   "cTObeeChoc": {
//     "label": "目标数据库",
//     "selected": [
//       "达梦",
//       "TD SQL"
//     ]
//   },
//   "EApf8knouk": {
//     "label": "字段长度",
//     "selected": "20"
//   },
//   "v8Ak3W05Q3": {
//     "label": "字段类型",
//     "selected": "String(Java兼容)"
//   }
// }

// 返回的sql为：
//    [
//   "ALTER TABLE test_db.test_user ADD COLUMN user_id VARCHAR(20);"
// ]

// 该脚本的目的是为了生成sql，所以不需要考虑sql注入问题，但是需要考虑sql的正确性，例如字段类型和长度的匹配，以及事务的处理
// function generateSQL(inputData) {
//     // 遍历 inputData，整理出我们需要的信息
//     const result = [];
//     let info = {};
//     for (let id in inputData) {
//         info[inputData[id].label] = inputData[id].selected;
//     }
//
//     // 准备基础SQL语句
//     let sqlBase = `ALTER TABLE ${info['数据库名']}.${info['表名']} ADD COLUMN ${info['字段名']} ${getType(info['字段类型'], info['字段长度'])}`;
//
//
//     // 根据不同数据库类型，返回不同的SQL语句
//     if (info['目标数据库'].includes('达梦')) {
//         let dmSql = `BEGIN WMSYS.WM_concat('${sqlBase}'); COMMIT; END;`;
//         console.log('达梦数据库SQL：', dmSql);
//         result.push({
//             sql: dmSql,
//             dbType: '达梦'
//         });
//     }
// }
//

import damengSQL from   './dameng_func.js';
import mysqlSQL from   './mysql_func.js';

function generateSQL(inputData) {
    // 遍历 inputData，整理出我们需要的信息
    const result = [];
    let info = {};
    for (let id in inputData) {
        info[inputData[id].label] = inputData[id].selected;
    }

    //获取目标数据库类型并生成SQL
    let dbType = info['目标数据库'];
    if (dbType.includes('达梦')) {
        result.push({
            sql: damengSQL.generateAddColumnSQL(info),
            dbType: '达梦'

        });
    }

    if (dbType.includes('MySQL')) {
        result.push({
            sql: mysqlSQL.generateAddColumnSQL(info),
            dbType: 'MySQL'

        });
    }
    return result;
}

export default {
    generateSQL
}

