import dbConf from "@/types/dbConf.js";
/**
 * mysql生成添加字段的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回 添加字段SQL 语句
 */
const generateAddColumnSQL = (inputData, opts = {}) => {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldName = inputData[dbConf.fieldName];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];
    const fieldDefault = inputData[dbConf.setDefault];
    if(fieldDefault === undefined || fieldDefault === 'undefined' || fieldDefault === '' || fieldDefault === null) {
        return `\n
        SELECT '${tableName}表中新增字段${fieldName}';
        SET @hs_sql = 'select 1 from dual;';
        SELECT
            'ALTER TABLE ${dbName}.${tableName} ADD ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)};'
             INTO @hs_sql
        FROM DUAL
        WHERE
            (
            SELECT
                count(1)
                FROM
                    information_schema.columns
                WHERE
                    table_schema = SCHEMA()
                    AND UPPER(table_name) = UPPER('${tableName}')
                    AND UPPER(column_name) = UPPER('${fieldName}')
            ) = 0
            AND 
            (
            SELECT 
                count(1) 
                FROM 
                    information_schema.TABLES 
                WHERE 
                    TABLE_SCHEMA = SCHEMA()
                    AND UPPER(TABLE_NAME) = UPPER('${tableName}')
            ) > 0;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;    
            \n`;
    } else {
        const sql = `\n
        SELECT '${tableName}表中新增字段${fieldName}';
        SET @hs_sql = 'select 1 from dual;';
        SELECT
            'ALTER TABLE ${dbName}.${tableName} ADD ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)} ${getDefault(fieldType, fieldDefault)};'
             INTO @hs_sql
        FROM DUAL
        WHERE
            (
            SELECT
                count(1)
                FROM
                    information_schema.columns
                WHERE
                    table_schema = SCHEMA()
                    AND UPPER(table_name) = UPPER('${tableName}')
                    AND UPPER(column_name) = UPPER('${fieldName}')
            ) = 0
            AND 
            (
            SELECT 
                count(1) 
                FROM 
                    information_schema.TABLES 
                WHERE 
                    TABLE_SCHEMA = SCHEMA()
                    AND UPPER(TABLE_NAME) = UPPER('${tableName}')
            ) > 0;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;    
            \n`;
        return sql;
    }
}

/**
 * mysql生成删除字段的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回删除字段的SQL 语句
 */
const generateDropColumnSQL = (inputData, opts = {}) => {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql = `\n
        SELECT '${tableName}表删除非主键字段${fieldName} ...';
        SET @hs_sql = 'select 1 from dual;';
        SELECT
            'ALTER TABLE ${dbName}.${tableName} DROP COLUMN ${fieldName};' INTO @hs_sql
        FROM DUAL
        WHERE
            (
            SELECT
                count(1)
                FROM
                    information_schema.columns
                WHERE
                    table_schema = SCHEMA()
                    AND UPPER(table_name) = UPPER('${tableName}')
                    AND UPPER(column_name) = UPPER('${fieldName}')
            ) > 0
            AND 
            (
            SELECT 
                count(1) 
                FROM 
                    information_schema.TABLES 
                WHERE 
                    TABLE_SCHEMA = SCHEMA()
                    AND UPPER(TABLE_NAME) = UPPER('${tableName}')
            ) > 0;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;
        \n`
    return sql;
}

/**
 * mysql生成修改字段的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回修改字段的SQL 语句
 */
function generateModifyColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldNewType = inputData[dbConf.setNewFieldType];
    const fieldNullable = inputData[dbConf.setNullable];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];
    if(fieldNullable === '是') {
        return `\n
        SELECT '修改${tableName}表非主键字段${fieldName}允许为空';
        SET @hs_sql = 'select 1 from dual;';
        SELECT
            'ALTER TABLE ${dbName}.${tableName} MODIFY ${fieldName} ${getType(fieldNewType, fieldLength, fieldPrecision)} NULL;' INTO @hs_sql
        FROM DUAL
        WHERE
            (
            SELECT
                count(1)
                FROM
                    information_schema.columns
                WHERE
                    table_schema = SCHEMA()
                    AND UPPER(table_name) = UPPER('${tableName}')
                    AND UPPER(column_name) = UPPER('${fieldName}')
            ) > 0
            AND 
            (
            SELECT 
                count(1) 
                FROM 
                    information_schema.TABLES 
                WHERE 
                    TABLE_SCHEMA = SCHEMA()
                    AND UPPER(TABLE_NAME) = UPPER('${tableName}')
            ) > 0;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;
        \n`
    } else {
        //FIXME 需要判断新字段类型长度和精度是否能够兼容原来的字段类型
        return `\n
        SET @hs_sql = 'select 1 from dual;';
        SELECT
            'ALTER TABLE ${dbName}.${tableName} MODIFY ${fieldName} ${getType(fieldNewType, fieldLength, fieldPrecision)};' INTO @hs_sql
        FROM DUAL
        WHERE
            (
            SELECT
                count(1)
                FROM
                    information_schema.columns
                WHERE
                    table_schema = database()
                    AND LOWER(table_name) = LOWER('${tableName}')
                    AND LOWER(column_name) = LOWER('${fieldName}')
                    AND character_maximum_length = ${fieldLength}
            ) = 1;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;
        \n`
    }
}


/**
 *     //Todo 未规范化
 * mysql生成重命名表的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回重命名表的SQL 语句
 */
function generateRenameTableSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const newTableName = inputData[dbConf.newTableName];


    const sql =
        // `RENAME TABLE ${tableName} TO ${newTableName};`;
        `ALTER TABLE ${dbName}.${tableName}
    RENAME ${newTableName};`;
    return sql;
}


/**
 * mysql生成添加索引的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string}
 */
function generateAddIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql = `\n
    SELECT '为数据库${dbName}的${tableName}表中字段${fieldName}添加索引${indexName}';
    SET @hs_sql = 'select 1 from dual;';
    SELECT
        'CREATE INDEX ${indexName} ON ${tableName}(${fieldName});' INTO @hs_sql
    FROM DUAL
    WHERE
        (
        SELECT
            count(1)
            FROM
                information_schema.statistics a, (SELECT database() as dbtest from dual) c
                WHERE a.INDEX_SCHEMA = c.dbtest
                AND LOWER(a.\`TABLE_NAME\`) = LOWER('${tableName}')
                AND LOWER(a.\`index_name\`) = LOWER('${indexName}')
        ) = 0;
    PREPARE hs_stmt FROM @hs_sql;
    EXECUTE hs_stmt;
    DEALLOCATE PREPARE hs_stmt;  
        \n`;
    return sql;
}

/**
 *   //Todo 未规范化
 * mysql生成删除索引的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回删除索引的SQL 语句
 */
function generateDropIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql = `
        ALTER TABLE ${dbName}.${tableName}
    DROP INDEX ${indexName};
    `;
    return sql;
}

/**
 *  //Todo 未实现
 *  //修改索引---包括修改索引名称、设置索引的查询计划可见性、改变索引有效性、重建索引...
 * @param inputData
 * @param opts
 * @returns {string}
 */
function generateModifyIndexSQL(inputData, opts = {}) {

    return '';
}

/**
 * mysql生成添加主键的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回添加主键的SQL 语句
 */
function generateAddPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql = `\n
    SELECT '为数据库${dbName}的${tableName}表中字段${fieldName}添加主键';
    SET @hs_sql = 'select 1 from dual;';
    SELECT
        'ALTER TABLE ${tableName} ADD PRIMARY KEY (${fieldName});' INTO @hs_sql
    FROM DUAL
    WHERE
        (
        SELECT
            count(1)
            FROM
                information_schema.tables
            WHERE
                UPPER(table_name) = UPPER('${tableName}')
                AND table_schema = SCHEMA()
        ) > 0
        AND (
            SELECT count(1) 
            FROM information_schema.statistics a
            WHERE
                a.INDEX_SCHEMA = SCHEMA()
                AND a.INDEX_NAME = 'PRIMARY'
                AND LOWER(a.\`TABLE_NAME\`) = LOWER('${tableName}')
            ) = 0;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;
    \n`;
    return sql;
}


/**
 * mysql生成删除主键的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回删除主键的SQL 语句
 */
function generateDropPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql = `\n
    SELECT '删除数据库${dbName}的${tableName}表的主键';
    SET @hs_sql = 'select 1 from dual;';
    SELECT
        'ALTER TABLE ${tableName} DROP PRIMARY KEY;' INTO @hs_sql
    FROM DUAL
    WHERE
        (
        SELECT
            count(1)
            FROM
                information_schema.tables
            WHERE
                UPPER(table_name) = UPPER('${tableName}')
                AND table_schema = SCHEMA()
        ) > 0
        AND (
            SELECT count(*) 
            FROM information_schema.statistics a
            WHERE
                a.INDEX_SCHEMA = SCHEMA()
                AND a.SEQ_IN_INDEX = 1
                AND a.COLUMN_NAME != ''
                AND LOWER(a.\`TABLE_NAME\`) = LOWER('${tableName}')
            ) > 0;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;
    \n`
    return sql;
}

/**
 * mysql生成修改主键的 SQL 语句
 * @param inputData 父组件收集到的数据
 * @param opts 额外配置, 暂时未用到
 * @returns {string} 返回修改主键的SQL 语句
 */
function generateModifyPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    //Todo 只支持按照单个字段修改主键, 后续需要支持多字段
    const sql = `\n
    SELECT '修改数据库${dbName}的${tableName}表的主键为字段${fieldName}';
    SET @hs_sql = 'select 1 from dual;';
    SELECT
        'ALTER TABLE ${tableName} DROP PRIMARY KEY, ADD PRIMARY KEY (${fieldName});' INTO @hs_sql
    FROM DUAL
    WHERE
        (
        SELECT
            count(1)
            FROM
                information_schema.columns a
            WHERE
                COLUMN_KEY = 'PRI'
                AND table_schema = SCHEMA()
                AND LOWER(table_name) = LOWER('${tableName}')
        ) > 0
        AND (
            SELECT count(1) 
            FROM information_schema.statistics a
            WHERE
                a.INDEX_SCHEMA = SCHEMA()
                AND a.INDEX_NAME = 'PRIMARY'
                AND UPPER(COLUMN_NAME) in (UPPER('${fieldName}'))
                AND LOWER(a.\`TABLE_NAME\`) = LOWER('${tableName}')
            ) <> 1;
        PREPARE hs_stmt FROM @hs_sql;
        EXECUTE hs_stmt;
        DEALLOCATE PREPARE hs_stmt;
    \n`
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
            if(L > 65 || L < 1 || P < 0 || P > 30 || P > L) {
                throw new Error('Invalid input. Please provide valid type, L, and P values.');
            }
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
            return `VARCHAR`;
        case dbConf.STDclob:
            return 'LONGTEXT';
        case dbConf.STDBlob:
            return 'MEDIUMBLOB';
        default:
            throw new Error(`Unsupported type: ${type}. Please handle this case.`);
    }
}

/**
 * 获取默认值
 * @param type 字段类型
 * @param defaultValue 默认值
 * @returns {string} 返回默认值
 */
const getDefault = (type, defaultValue) => {
    if(defaultValue === undefined || defaultValue === 'undefined'
        || defaultValue === '' || defaultValue === null
        || defaultValue === 'null' || defaultValue === 'NULL') { //FIXME 条件判断不严谨
        return 'DEFAULT NULL';
    }
    switch (type) {
        case dbConf.STDint2_t:
        case dbConf.STDint3_t:
        case dbConf.STDint4_t:
        case dbConf.STDint6_t:
        case dbConf.STDint8_t:
        case dbConf.STDint10_t:
        case dbConf.STDdouble:
            if(isNaN(defaultValue)) return '';
            else return `DEFAULT ${defaultValue}`;
        case dbConf.STDchar:
        case dbConf.STDstr:
            return `DEFAULT '${defaultValue}'`;
        case dbConf.STDdate:
        case dbConf.STDtime:
        case dbConf.STDdatetime:
        case dbConf.STDtimestamp:
            return `DEFAULT CURRENT_TIMESTAMP`;
        case dbConf.STDclob:
        case dbConf.STDBlob:
            return 'DEFAULT NULL';
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
    generateModifyIndexSQL,
    generateAddPrimaryKeySQL,
    generateDropPrimaryKeySQL,
    generateModifyPrimaryKeySQL,

}