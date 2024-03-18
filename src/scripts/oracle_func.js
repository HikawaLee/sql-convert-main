import dbConf from "../types/dbConf.js";


/**
 * Generate an oracle SQL for add new column into the existing table.
 * @param inputData
 * @param opts
 * @returns {string}
 */
function generateAddColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];



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
    `
    return sql;
}

/**
 * Generate a oracle SQL for drop column from the existing table.
 * 1. ALTER TABLE table_name SET UNUSED COLUMN column_name;
 * 2. ALTER TABLE table_name DROP UNUSED COLUMNS;
 * 3. ALTER TABLE table_name DROP UNUSED COLUMNS CHECKPOINT 250;   If you want to reduce the amount of undo logs accumulated, you can use the CHECKPOINT option that forces a checkpoint after the specified number of rows has been processed
 * @param inputData {object} The input data from the front end.
 * @param opts {object} The options.
 * @returns {string} The SQL statement for drop column.
 */
function generateDropColumnSQL(inputData, opts = {}) {

    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    //ALTER TABLE table_name DROP COLUMN column_name;Alternatively,
    // you can use Unused Columns to drop a column from a table.
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
    `

    return sql;
}


function generateModifyColumnSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const fieldType = inputData[dbConf.fieldType];
    const fieldLength = inputData[dbConf.fieldLength];
    const fieldPrecision = inputData[dbConf.fieldPrecision];

    const sql = `\n
prompt ${tableName}表的非主键字段${fieldName}......
declare
  v_rowcount integer;
  v_nullable char(1);
begin
  select count(*) into v_rowcount
    from user_tables
   where table_name = upper('${tableName}');
  if v_rowcount > 0 then
    select count(*) into v_rowcount
      from user_tab_columns
     where table_name = upper('${tableName}')
       and column_name = upper('${fieldName}');
    if v_rowcount > 0 then
      select t.NULLABLE into v_nullable from user_tab_columns t 
      where t.TABLE_NAME = upper('${tableName}') 
      and t.COLUMN_NAME = upper('o${fieldName}');
      if v_nullable <> 'Y' then
           execute immediate 'alter table ${tableName} modify ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)} null';
      end if;
    end if;
  end if;
end;
/
    `

    return sql;
}


function generateRenameTableSQL(inputData, opts = {}) {
    //Todo 未规范化
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const newTableName = inputData[dbConf.newTableName];

    const sql =
        `RENAME ${tableName} 
    TO ${newTableName};`;

    return sql;

}


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


function generateDropIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const indexName = inputData[dbConf.fieldIndex];

    ///FIXME 未找到对应模板

    //const sql = `DROP INDEX ${tableName}.${indexName};`;




    return sql;

}


function generateRebuildIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const indexName = inputData[dbConf.fieldIndex];

    //FIXME
    const sql =
        `ALTER INDEX ${indexName}
            REBUILD ONLINE;`;


    return sql;
}


function generateAddPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

    //命名主键 ALTER TABLE table_name ADD CONSTRAINT constraint_name PRIMARY KEY (column1, column2, ... column_n);
    const sql =
        `ALTER TABLE ${tableName}
            ADD PRIMARY KEY (${fieldName});`;
    return sql;
}

function generateDropPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];

///TODO 未规范化
    const sql =
        `DECLARE
            sql_stmt VARCHAR2(255);
            cons_name VARCHAR2(30);
        BEGIN
            SELECT CONSTRAINT_NAME INTO cons_name
            FROM USER_CONSTRAINTS
            WHERE TABLE_NAME = ${dbName}.${tableName} AND CONSTRAINT_TYPE = 'P';

            sql_stmt := 'ALTER TABLE ${dbName}.${tableName} DROP CONSTRAINT ' || cons_name;
            EXECUTE IMMEDIATE sql_stmt;
        END;`
    return sql;
}


function generateModifyPrimaryKeySQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const fieldName = inputData[dbConf.fieldName];
    const primaryKeyName = inputData[dbConf.primaryKeyName];
    const newPrimaryKeyName = inputData[dbConf.newPrimaryKeyName];
//     const sql = `\n
// prompt ${tableName} 表修改主键 ${primaryKeyName}  为 ${newPrimaryKeyName} ......
// DECLARE
//     v_pk_exists   NUMBER;
//     v_table_exists NUMBER;
// BEGIN
//     -- Check if the table exists
// SELECT COUNT(*)
// INTO v_table_exists
// FROM USER_TABLES
// WHERE TABLE_NAME = UPPER('${tableName}');
// -- Exit if table doesn't exist
// IF v_table_exists = 0 THEN
//         RETURN;
// END IF;
//     -- Check if the primary key exists for the table
// SELECT COUNT(*)
// INTO v_pk_exists
// FROM USER_CONSTRAINTS
// WHERE TABLE_NAME = UPPER('${tableName}')
//   AND CONSTRAINT_TYPE = 'P'
//   AND CONSTRAINT_NAME = UPPER('${primaryKeyName}');
// -- If the primary key exists, rename it by prepending 'pk_'
// IF v_pk_exists = 1 THEN
//         EXECUTE IMMEDIATE 'ALTER TABLE ${primaryKeyName} RENAME CONSTRAINT ${primaryKeyName} TO ${newPrimaryKeyName}';
// END IF;
// END;
// /
//     `


    const sql = `\n
prompt ${tableName} 重建主键
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
    `


}





/**
 * 将前端自定义的类型转换为 Oracle 的类型
 * @param {string} type 前端自定义的标准类型
 * @param {number} L 字段长度
 * @param {number} P 表示有效位数的精度。 P 的范围是 1 到 65
 * @return {string} 返回 Oracle 的类型
 */
function getType(type, L = dbConf.oracleDecimalP, P = dbConf.oracleDecimalS) {
    // 参数校验
    // if (typeof type !== 'string' || typeof L !== 'number' || typeof P !== 'number') {
    //     throw new Error('Invalid input. Please provide valid type, L, and P values.');
    // }

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
            return 'CLOB';
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
    generateAddPrimaryKeySQL,
    generateDropPrimaryKeySQL,
    // generateModifyPrimaryKeySQL
}