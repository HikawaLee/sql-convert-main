import dbConf from "../types/dbConf.js";


/**
 * oracle新增字段
 * @param inputData 父组件收集的数据
 * @param opts 额外参数, 暂时未用
 * @returns {string} 返回oracle新增字段的sql
 */
function generateAddColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldName = inputData[dbConf.fieldName];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];
    const fieldDefault = inputData[dbConf.setDefault];
    const sql = `\n
        prompt ${tableName} 新增字段 ${fieldName} ......
        declare
            v_rowcount integer;
        begin
        select count(*) into v_rowcount from user_tables where table_name = upper('${tableName}');
        if v_rowcount > 0 then
        select count(*) into v_rowcount from user_tab_columns
        where table_name = upper('${tableName}')
            and column_name = upper('${fieldName}');
        if v_rowcount = 0 then
            execute immediate 'ALTER TABLE ${tableName} ADD ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)}';
        end if;
        end if;
        end;
       /
        \n`
    return sql;

}

/**
 * oracle删除字段
 * @param inputData 父组件收集的数据
 * @param opts 额外参数, 暂时未用
 * @returns {string} 返回oracle删除字段的sql
 */
function generateDropColumnSQL(inputData, opts = {}) {

    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    const sql = `\n
        prompt ${tableName} 删除非主键字段 ${fieldName} ......
        declare
            v_rowcount integer;
        begin
            select count(*) into v_rowcount from user_tables where table_name = upper('${tableName}');
            if v_rowcount > 0 then
                select count(*) into v_rowcount from user_tab_columns
                where table_name = upper('${tableName}')
                    and column_name = upper('${fieldName}');
                if v_rowcount > 0 then
                    execute immediate 'ALTER TABLE ${tableName} DROP COLUMN ${fieldName}';
                end if;
            end if;
        end;
        /
    \n`

    return sql;
}


/**
 * oracle修改字段
 * @param inputData 父组件收集的数据
 * @param opts 额外参数, 暂时未用
 * @returns {string} 返回oracle修改字段的sql
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

    ///region 允许为空, 暂时只修改字段类型, 故废弃
    // const sql = `\n
    //     prompt ${tableName}表的非主键字段${fieldName}......
    //     declare
    //         v_rowcount integer;
    //         v_nullable char(1);
    //     begin
    //         select count(*) into v_rowcount
    //             from user_tables
    //             where table_name = upper('${tableName}');
    //         if v_rowcount > 0 then
    //             select count(*) into v_rowcount
    //                 from user_tab_columns
    //             where table_name = upper('${tableName}')
    //                 and column_name = upper('${fieldName}');
    //         if v_rowcount > 0 then
    //             select t.NULLABLE into v_nullable from user_tab_columns t
    //         where t.TABLE_NAME = upper('${tableName}')
    //             and t.COLUMN_NAME = upper('o${fieldName}');
    //         if v_nullable <> 'Y' then
    //             execute immediate 'alter table ${tableName} modify ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)} null';
    //         end if;
    //         end if;
    //         end if;
    //     end;
    //     /
    // \n`
    ///endregion


    const sql = `\n
        prompt ${tableName}表的非主键字段${fieldName}......
        declare
            v_rowcount integer;
        begin
            select count(*) into v_rowcount
                from user_tables
                where table_name = upper('${tableName}');
            if v_rowcount > 0 then
                select count(*) into v_rowcount
                    from user_tab_columns
                where table_name = upper('${tableName}')
                    and column_name = upper('${fieldName}');
            if v_rowcount = 1 then
                execute immediate 'alter table ${tableName} modify ${fieldName} ${getType(fieldNewType, fieldLength, fieldPrecision)} ';
            end if;
        end if;
    end;
    /
    \n`

    return sql;
}


/**
 * oracle新增索引
 * @param inputData 父组件收集的数据
 * @param opts 额外参数, 暂时未用
 * @returns {string} 返回oracle新增索引的sql
 */

function generateAddIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const indexName = inputData[dbConf.fieldIndex];

    const sql = `
    prompt add index to file datatable ${dbName}  ...
    declare
        v_rowcount number;
    begin
        select count(*) into v_rowcount from user_indexes where table_name = upper('${tableName}') and index_name = upper('${indexName}');
        if v_rowcount = 0 then
            FOR idx IN (SELECT index_name FROM user_indexes WHERE table_name = '${tableName}') LOOP
            EXECUTE IMMEDIATE 'DROP INDEX ' || idx.index_name;
            END LOOP;
            execute immediate 'CREATE INDEX ${indexName} ON ${tableName}(${fieldName} ASC) ';
        end if;
    end;
    /
    `

    return sql;
}


/**
 *
 * 删除主键
 * //FIXME 未找到对应模板
 * @param inputData 父组件收集的数据
 * @param opts 额外参数, 暂时未用
 * @returns {string} 返回oracle删除主键的sql
 */
function generateDropPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const primaryKeyName = inputData[dbConf.primaryKeyName];

    const sql = `
        DECLARE
            sql_stmt VARCHAR2(255);
            cons_name VARCHAR2(30);
        BEGIN
            SELECT CONSTRAINT_NAME INTO cons_name
            FROM USER_CONSTRAINTS
            WHERE TABLE_NAME = UPPER('${tableName}') AND CONSTRAINT_TYPE = 'P';

            sql_stmt := 'ALTER TABLE ${tableName} DROP CONSTRAINT ' || cons_name;
            EXECUTE IMMEDIATE sql_stmt;
        END;
        /
        `
    return sql;
}

/**
 * 修改主键
 * @param inputData 父组件收集的数据
 * @param opts 额外参数, 暂时未用
 * @returns {string} 返回oracle修改主键的sql
 */
function generateModifyPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const primaryKeyName = inputData[dbConf.primaryKeyName];
    const newPrimaryKeyName = inputData[dbConf.newPrimaryKeyName];




    // const sql = `\n
    //     prompt ${dbName} 表修改主键键名 ${primaryKeyName} 为 ${newPrimaryKeyName}
    //     DECLARE
    //         v_pk_exists   NUMBER;
    //         v_table_exists NUMBER;
    //     BEGIN
    //         -- Check if the table exists
    //     SELECT COUNT(*)
    //     INTO v_table_exists
    //     FROM USER_TABLES
    //     WHERE TABLE_NAME = UPPER('${tableName}');
    //     -- Exit if table doesn't exist
    //     IF v_table_exists = 0 THEN
    //             RETURN;
    //     END IF;
    //         -- Check if the primary key exists for the table
    //     SELECT COUNT(*)
    //     INTO v_pk_exists
    //     FROM USER_CONSTRAINTS
    //     WHERE TABLE_NAME = UPPER('${tableName}')
    //         AND CONSTRAINT_TYPE = 'P'
    //         AND CONSTRAINT_NAME = UPPER('${primaryKeyName}');
    //     -- If the primary key exists, rename it by prepending 'pk_'
    //     IF v_pk_exists = 1 THEN
    //             EXECUTE IMMEDIATE 'ALTER TABLE ${tableName} RENAME CONSTRAINT ${primaryKeyName} TO ${newPrimaryKeyName}';
    //     END IF;
    //     END;
    //     /
    //     \n
    //     `

    const sql = `\n
    prompt ${tableName} 重建主键,新增 ${fieldName} 字段
    declare
        v_rowcount number;
    begin
        select count(*) into v_rowcount from user_constraints where table_name = upper('${tableName}') and constraint_name = upper('${primaryKeyName}');
    if v_rowcount > 0 then
        select count(*) into v_rowcount from user_cons_columns t where table_name = upper('${tableName}') and t.column_name = upper('${fieldName}') and t.constraint_name = upper('${primaryKeyName}');
    if v_rowcount = 0 then
       execute immediate 'alter table ${tableName} drop constraint ${primaryKeyName} cascade drop index';
    end if;
    end if;
    select count(*) into v_rowcount from user_tables where table_name = upper('${tableName}');
    if v_rowcount >0 then
    select count(*) into v_rowcount from user_constraints where table_name = upper('${tableName}') and constraint_name = upper('${primaryKeyName}');
    if v_rowcount = 0 then
       execute immediate 'ALTER TABLE ${tableName} ADD CONSTRAINT ${primaryKeyName} PRIMARY KEY(${fieldName})';
    end if;
    end if;
    end;
    /
    \n
    `


    return sql;





}


/**
 * 将前端自定义的类型转换为 Oracle 的类型
 * @param {string} type 前端自定义的标准类型
 * @param {number} L 字段长度
 * @param {number} P 表示有效位数的精度。 P 的范围是 1 到 65
 * @return {string} 返回 Oracle 的类型
 */
function getType(type, L = dbConf.oracleDecimalP, P = dbConf.oracleDecimalS) {
    L = parseInt(L);
    P = parseInt(P);
    // 参数校验
    if (typeof type !== 'string' || typeof L !== 'number' || typeof P !== 'number') {
        console.log('类型转换出错');
        throw new Error('类型转换出错');
    }

    switch (type) {
        case dbConf.STDint2_t:
            return 'NUMBER(2, 0)';
        case dbConf.STDint3_t:
            return 'NUMBER(3, 0)';
        case dbConf.STDint4_t:
            return 'NUMBER(4, 0)';
        case dbConf.STDint6_t:
            return 'NUMBER(6, 0)';
        case dbConf.STDint8_t:
            return 'NUMBER(8, 0)';
        case dbConf.STDint10_t:
            return 'NUMBER(10, 0)';
        case dbConf.STDdouble:
            if (L > 38 || L < 1 || P > 127 || P < -84) {
                console.log(`L's type is ${typeof L} , P's type is ${typeof P}\n`)
                console.log(`L > 38 ? ${L > 38} , L < 1 ? ${L < 1} , P < -84 ? ${P < -84} , P > 127 ? ${P > 127} , P > L ? ${P > L}\n`)
                console.log(`L is ${L} , P is ${P} ,Invalid input. Please provide valid type, L, and P values.`);
                throw new Error('Invalid input in switch(type). Please provide valid type, L, and P values.');
            }
            return `DECIMAL(${L},${P})`;
        case dbConf.STDchar:
            return 'CHAR';
        case dbConf.STDstr:
            return `VARCHAR(${L})`;
        case dbConf.STDdate:
            return 'NUMBER(8, 0)';
        case dbConf.STDtime:
            return 'NUMBER(6, 0)';
        case dbConf.STDdatetime:
            return 'DATE';
        case dbConf.STDtimestamp:
            return `VARCHAR2(${L})`;
        case dbConf.STDclob:
        case dbConf.STDBlob:
            return 'CLOB';
        default:
            throw new Error(`Unsupported type: ${type}. Please handle this case.`);
    }
}


export default {
    generateAddColumnSQL,
    generateDropColumnSQL,
    generateModifyColumnSQL,

    generateAddIndexSQL,

    generateDropPrimaryKeySQL,
    generateModifyPrimaryKeySQL
}