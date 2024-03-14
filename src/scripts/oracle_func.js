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


    ///TODO 加字段前先检查字段是否存在
    //SET SERVEROUTPUT ON SIZE 1000000
    // DECLARE
    //   v_col_exists NUMBER
    // BEGIN
    //   SELECT count(*) INTO v_col_exists
    //     FROM user_tab_cols
    //     WHERE column_name = 'EFFECTIVE_DATE'
    //       AND table_name = 'MEMBERS';
    //
    //    IF (v_col_exists = 0) THEN
    //       EXECUTE IMMEDIATE 'ALTER TABLE members ADD effective_date DATE';
    //    ELSE
    //     DBMS_OUTPUT.PUT_LINE('The column effective_date already exists');
    //   END IF;
    // END;
    // /

    const sql =
        `ALTER TABLE ${dbName}.${tableName}
            ADD ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)};`;
    //adding-column can have many options, such as default value, not null, comment, index, unique, primary key, auto increment, unsigned, zerofill, charset, collation, check, reference, expression, function, constraint
    // 1.  with a Default Value / NOT NULL
    // ALTER TABLE your_table ADD new_column VARCHAR2(255) DEFAULT 'default_value' / NOT NULL;
    // 2.  adding a PRIMARY KEY column
    //alter table emp add (EmpID varchar2(20) constraint emp_pk primary key);
    // 3. add multiple columns
    //ALTER TABLE customer
    // ADD (
    //   suburb VARCHAR2(100),
    //   postcode VARCHAR2(20)
    // );
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
    const sql =
        `ALTER TABLE ${dbName}.${tableName}
            DROP (
                  ${fieldName}
                );`;

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
            MODIFY ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)};`;

    return sql;
}


function generateRenameTableSQL(inputData, opts = {}) {
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

    const sql =
        `CREATE INDEX ${indexName}
            ON ${dbName}.${tableName} (${fieldName});`;

    return sql;
}


function generateDropIndexSQL(inputData, opts = {}) {
    const dbName = inputData[dbConf.dbName];
    const tableName = inputData[dbConf.tableName];
    const indexName = inputData[dbConf.fieldIndex];

    //const sql = `DROP INDEX ${tableName}.${indexName};`;
    const sql =
        `        DECLARE
            COUNT_INDEXES   INTEGER;
        BEGIN
            SELECT COUNT ( * )
                INTO COUNT_INDEXES
            FROM USER_INDEXES
                WHERE INDEX_NAME = ${indexName};
                
            IF COUNT_INDEXES > 0 THEN
                    EXECUTE IMMEDIATE 'DROP INDEX ${indexName}';
                END IF;
            END;
        /`


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


    //1. ①先查出来主键名（constraint_name）
    //SELECT t.* from user_cons_columns t where t.table_name  = 'TABLE_TEST' and t.position is not null;
    // 公式：SELECT t.* from user_cons_columns t where t.table_name  = '表名' and t.position is not null;   --表名必须大写，如：TABLE_TEST
    // user_constraints：是表约束的视图,描述的是约束类型(constraint_type)是什么,属于哪些表(table_name),如果约束的类型为R(外键)的话,那么r_constraint_name字段存放的就是被引用主表中的主键约束名。
    //         user_cons_columns：是表约束字段的视图,说明表中的和约束相关的列参与了哪些约束。这些约束有主键约束,外键约束,索引约束.
    //         两者可以通过(owner,constraint_name,table_name)关联

    //2. ②删除主键
    //ALTER TABLE table_name DROP CONSTRAINT constraint_name;
    // declare
    // sql_stmt varchar2(255);
    // cons_name varchar2(30);
    // begin
    // select CONSTRAINT_NAME
    // into cons_name
    // From  USER_CONSTRAINTS
    // where table_name='PERSONS'
    // AND  CONSTRAINT_TYPE='P';
    //
    // sql_stmt:=' ALTER TABLE PERSONS
    // DROP CONSTRAINT '||cons_name;
    //
    // dbms_output.put_line(sql_stmt);
    // execute immediate sql_stmt;
    //
    // end;
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