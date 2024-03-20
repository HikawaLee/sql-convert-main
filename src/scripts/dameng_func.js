//生成各种达梦数据库的sql

/**
 * 注意事项
 *
 * 1. char(n), varchar类型的长度定义不同: 主流数据库支持n为字符个数,达梦中n为字节数----达梦中 varchar(128) 是存不下 128 个汉字的，最多只能存 42 个（跟字符集有关）。
 * 2. 达梦数据库oracle模式下的date类型实际为timpstamp(0)类型，长度为8
 * 3. 达梦数据库for update语句只支持单表
 * 4. 表名、列名可能与数据库的保留字重名，[MySQL] 通常使用反引号, 达梦数据库使用双引号
 * 5.达梦不支持默认时间设置，可以在字段上设置触发器来实现
 * 6. DM直接将varchar类型修改为text类型会报错：数据类型的变更无效
 */

import dbConf from "../types/dbConf.js";

//新增字段
function generateAddColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];

    const sql = `
        ALTER TABLE ${dbName}.${tableName}
            ADD ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)};
        `;
    return sql;
}


//删除字段
function generateDropColumnSQL(inputData, opts = {}) {
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


//修改字段
function generateModifyColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];

    const sql = `
        ALTER TABLE ${dbName}.${tableName}
            MODIFY ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)};
        `;
    return sql;
}


//重命名表
function generateRenameTableSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const newTableName = inputData[dbConf.newTableName];

    const sql = `
        ALTER TABLE ${dbName}.${tableName}
            RENAME TO ${newTableName};
        `;
    return sql;
}


//新增索引
function generateAddIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql = `
        CREATE INDEX ${indexName}
            ON ${dbName}.${tableName} (${fieldName});
        `;
    return sql;
}


//删除索引
function generateDropIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql = `
        DROP INDEX ${indexName} IF EXISTS;
        `;
    return sql;
}



//修改索引---包括修改索引名称、设置索引的查询计划可见性、改变索引有效性、重建索引和索引监控的功能, 目前只实现了重建索引
/**
 * 重建索引
 *重建索引也包含很多可选项, 例如并行度, 重建策略, 重建模式, 重建类型, 重建优先级, 重建过滤条件, 重建选项, 重建参数等, 这里只是简单的重建索引
 * @param {Object} inputData 输入数据
 * @param {Object} opts 选项
 * @return {string} 返回 SQL 语句
 */
function generateRebuildIndexSQL(inputData, opts = {}) {
const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql = `
        ALTER INDEX ${indexName} REBUILD EXCLUSIVE;
        `;
    return sql;
}



//新增主键
function generatePrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql = `
        ALTER TABLE ${dbName}.${tableName}
            ADD PRIMARY KEY (${fieldName});
        `;
    return sql;
}


//删除主键
function generateDropPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    /// FIXME 需要获取使用复合SQL
    // const primaryKeyName = `SELECT * FROM ALL_CONSTRAINTS WHERE CONSTRAINT_TYPE='P';`
    // const sql =
    //     `ALTER TABLE ${dbName}.${tableName}
    //     DROP CONSTRAINT ${primaryKeyName};`;


    return '';
}

/**
 * 将前端自定义的类型转换为 达梦 的类型
 * @param {string} type 前端自定义的标准类型
 * @param {number} L 字段长度
 * @param {number} P 表示有效位数的精度。 P 的范围是 1 到 65
 * @return {string} 返回 达梦 的类型
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
            return 'CLOB';
        case dbConf.STDBlob:
            return 'BLOB';
        default:
            throw new Error(`Unsupported type: ${type}. Please handle this case.`);
    }
}
export default {
    generateAddColumnSQL,
    generateDropColumnSQL,
    generateModifyColumnSQL,
    generateRenameTableSQL,
    generateAddIndexSQL,
    generateDropIndexSQL,
    generateRebuildIndexSQL,
    generatePrimaryKeySQL,
    generateDropPrimaryKeySQL
}
