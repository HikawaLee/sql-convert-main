
import dbConf from "../types/dbConf.js";

//删除表
function generateDropTableSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    //FIXME 达梦数据库不支持一次删除多个字段, 并且如果待删除字段引用了其他字段, 则需要添加CASCADE关键字
    const sql =  `
        ALTER TABLE ${dbName}.${tableName}
            DROP ${fieldName};
        `;
    return sql;
}

function getType(type, L = dbConf.mysqlDecimalP, P = dbConf.mysqlDecimalD) {
    // 参数校验
    // if (typeof type !== 'string' || typeof L !== 'number' || typeof P !== 'number') {
    //     throw new Error('Invalid input. Please provide valid type, L, and P values.');
    // }

    switch (type) {
        case dbConf.STDint2_t:
        case dbConf.STDint3_t:
        case dbConf.STDint4_t:
        case dbConf.STDint6_t:
        case dbConf.STDint8_t:
        case dbConf.STDint10_t:
            return 'INT';
        case dbConf.STDdouble:
            return `DECIMAL(${L},${P})`;
        case dbConf.STDchar:
            return 'CHAR';
        case dbConf.STDstr:
            return `VARCHAR(${L})`;
        case dbConf.STDdate:
        case dbConf.STDtime:
            return 'INT';
        case dbConf.STDdatetime:
            return 'DATETIME';
        case dbConf.STDtimestamp:
            return `VARCHAR(${L})`;
        case dbConf.STDclob:
            return 'CLOB';
        case dbConf.STDBlob:
            return 'BLOB';
        default:
            throw new Error(`Unsupported type: ${type}. Please handle this case.`);
    }
}
export default {
    generateDropTableSQL,
}
