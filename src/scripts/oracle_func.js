import KV from './getKV.js';


/**
 * Generate a oracle SQL for add new column into the existing table.
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