import KV from './getKV.js';


/**
 * Generate a mysqldb SQL for add new column into the existing table.
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

        ///TODO 加字段前先检查字段是否存在, 例如
    // SELECT
    //     IF(count(*) = 1, 'Exist','Not Exist') AS result
    // FROM
    //     information_schema.columns
    // WHERE
    //     table_schema = 'classicmodels'
    //         AND table_name = 'vendors'



        const sql = `ALTER TABLE ${dbName}.${tableName} ADD COLUMN ${fieldName} ${getType(fieldType, fieldLength)}`;
      //adding-column can have many options, such as default value, not null, comment, index, unique, primary key, auto increment, unsigned, zerofill, charset, collation, check, reference, expression, function, constraint
    /*
    the pattern is: ALTER TABLE table_name ADD [COLUMN] column_name column_definition [FIRST|AFTER existing_column];
     */

    // 1. with a Default Value
    // ALTER TABLE table_name ADD COLUMN new_column_name data_type DEFAULT default_value;
    // 2. Adding a Column with a Specific Position
    // ALTER TABLE table_name ADD COLUMN new_column_name data_type FIRST;
    // ALTER TABLE table_name ADD COLUMN new_column_name data_type AFTER existing_column;
    // 3. Multiple Columns
    // ALTER TABLE table_name
    // ADD COLUMN column_name1 data_type,
    // ADD COLUMN column_name2 data_type,
    //4. with check
    //ALTER TABLE table_name ADD COLUMN new_column_name data_type CHECK (condition);
    //ALTER TABLE employees
    // ADD salary DECIMAL(8, 2) CHECK (salary > 0);
        console.log('MySQL SQL：', sql);
        return sql;
}







/**
 * 将前端自定义的类型转换为 MySQL 的类型
 * @param {string} type 前端自定义的标准类型
 * @param {number} L 字段长度
 * @param {number} P 表示有效位数的精度。 P 的范围是 1 到 65
 * @return {string} 返回 MySQL 的类型
 */
function getType(type, L, P) {
    // 参数校验
    // if (typeof type !== 'string' || typeof L !== 'number' || typeof P !== 'number') {
    //     throw new Error('Invalid input. Please provide valid type, L, and P values.');
    // }

    switch (type) {
        case KV.STDint2_t:
        case KV.STDint3_t:
        case KV.STDint4_t:
        case KV.STDint6_t:
        case KV.STDint8_t:
        case KV.STDint10_t:
            return 'INT';
        case KV.STDdouble:
            return `DECIMAL(${L},${P})`;
        case KV.STDchar:
            return 'CHAR';
        case KV.STDstr:
            return `VARCHAR(${L})`;
        case KV.STDdate:
        case KV.STDtime:
            return 'INT'; // 注意：根据你的具体用例，这里可能需要进一步细化。
        case KV.STDdatetime:
            return 'DATETIME';
        case KV.STDtimestamp:
            return `VARCHAR(${L})`;
        case KV.STDclob:
            return 'LONGTEXT';
        case KV.STDBlob:
            return 'MEDIUMBLOB';
        default:
            throw new Error(`Unsupported type: ${type}. Please handle this case.`);
    }
}

export default {
    generateAddColumnSQL
}