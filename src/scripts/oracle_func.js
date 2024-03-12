import KV from './getKV.js';


/**
 * Generate an oracle SQL for add new column into the existing table.
 * @param inputData
 * @param opts
 * @returns {string}
 */
function generateAddColumnSQL(inputData, opts = {}) {
    const dbName = inputData[KV.dbName];
    const tableName = inputData[KV.tableName];
    const fieldName = inputData[KV.fieldName];
    const fieldType = inputData[KV.fieldType];
    const fieldLength = inputData[KV.fieldLength];
    const fieldPrecision = inputData[KV.fieldPrecision];


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

    const sql = `ALTER TABLE ${dbName}.${tableName} ADD ${fieldName} ${getType(fieldType, fieldLength, fieldPrecision)}`;
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
    console.log('Oracle SQL：', sql);
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
function genDropColumnSQL(inputData, opts = {}) {

    const dbName = inputData[KV.dbName];
    const tableName = inputData[KV.tableName];
    const fieldName = inputData[KV.fieldName];

    //ALTER TABLE table_name DROP COLUMN column_name;Alternatively,
    // you can use Unused Columns to drop a column from a table.
    const sql = `ALTER TABLE ${dbName}.${tableName} DROP COLUMN ${fieldName}`;
    console.log('Oracle SQL：', sql);
    return sql;
}





/**
 * 将前端自定义的类型转换为 Oracle 的类型
 * @param {string} type 前端自定义的标准类型
 * @param {number} L 字段长度
 * @param {number} P 表示有效位数的精度。 P 的范围是 1 到 65
 * @return {string} 返回 Oracle 的类型
 */
function getType(type, L, P) {
    // 参数校验
    // if (typeof type !== 'string' || typeof L !== 'number' || typeof P !== 'number') {
    //     throw new Error('Invalid input. Please provide valid type, L, and P values.');
    // }

    switch (type) {
        case KV.STDint2_t:
            return 'NUMBER(2, 0)';
        case KV.STDint3_t:
            return 'NUMBER(3, 0)';
        case KV.STDint4_t:
            return 'NUMBER(4, 0)';
        case KV.STDint6_t:
            return 'NUMBER(6, 0)';
        case KV.STDint8_t:
            return 'NUMBER(8, 0)';
        case KV.STDint10_t:
            return 'NUMBER(10, 0)';
        case KV.STDdouble:
            return `DECIMAL(${L},${P})`;
        case KV.STDchar:
            return 'CHAR';
        case KV.STDstr:
            return `VARCHAR(${L})`;
        case KV.STDdate:
            return 'NUMBER(8, 0)';
        case KV.STDtime:
            return 'NUMBER(6, 0)';
        case KV.STDdatetime:
            return 'DATE';
        case KV.STDtimestamp:
            return `VARCHAR2(${L})`;
        case KV.STDclob:
            return 'CLOB';
        default:
            throw new Error(`Unsupported type: ${type}. Please handle this case.`);
    }
}

export default {
    generateAddColumnSQL
}