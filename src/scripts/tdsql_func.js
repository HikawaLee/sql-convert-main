import dbConf from "../types/dbConf.js";

/**
 * Generate a TDSql SQL for add new column into the existing table.
 * @param inputData
 * @param opts
 * @returns {string}
 */
const generateAddColumnSQL = (inputData, opts = {}) => {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldType = inputData[dbConf.fieldType];
    const fieldPrecision = inputData[dbConf.fieldPrecision];

    ///TODO 加字段前先检查字段是否存在


    const sql =
        `ALTER TABLE ${dbName}.${tableName} 
    ADD COLUMN ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)};`;
    return sql;
}


function generateDropColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql =
        `ALTER TABLE ${dbName}.${tableName}
    DROP COLUMN ${fieldName};`;
    return sql;
}


function generateModifyColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];

    const sql =
        `ALTER TABLE ${dbName}.${tableName}
    MODIFY COLUMN ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)};`;
    return sql;
}

function generateRenameTableSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const newTableName = inputData[dbConf.newTableName];

    const sql =

        `ALTER TABLE ${dbName}.${tableName}
    RENAME ${newTableName};`; //官方文档未找到相应说明
    return sql;
}


function generateAddIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql =
        `ALTER TABLE ${dbName}.${tableName}
    ADD INDEX ${indexName} (${fieldName});`;
    return sql;
}


function generateDropIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql =
        `ALTER TABLE ${dbName}.${tableName}
    DROP INDEX ${indexName};`;
    return sql;
}


function generateModifyIndexSQL(inputData, opts = {}) {
    //FIXME
}


function generatePrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql =
        `ALTER TABLE ${dbName}.${tableName}
    ADD PRIMARY KEY (${fieldName});`;
    return sql;
}


function generateDropPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql =
        `ALTER TABLE ${dbName}.${tableName}
    DROP PRIMARY KEY;`;
    return sql;
}






/**
 * 将前端自定义的类型转换为 MySQL 的类型
 * @param {string} type 前端自定义的标准类型
 * @param {number} L 字段长度
 * @param {number} P 表示有效位数的精度。 P 的范围是 1 到 65
 * @return {string} 返回 MySQL 的类型
 */
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
            return 'LONGTEXT';
        case dbConf.STDBlob:
            return 'MEDIUMBLOB';
        default:
            throw new Error(`Unsupported type: ${type}. Please handle this case.`);
    }
}

export default  {
    generateAddColumnSQL,
    generateDropColumnSQL,
    generateModifyColumnSQL,
    generateRenameTableSQL,
    generateAddIndexSQL,
    generateDropIndexSQL,
    generateModifyIndexSQL,
    generatePrimaryKeySQL,
    generateDropPrimaryKeySQL
}