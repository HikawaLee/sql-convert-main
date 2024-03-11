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

import KV from './getKV.js'

//新增字段
function generateAddColumnSQL(inputData, opts = {}) {
    const dbName = inputData[KV.dbName];
    const tableName = inputData[KV.tableName];
    const fieldName = inputData[KV.fieldName];
    const fieldType = inputData[KV.fieldType];
    const fieldLength = inputData[KV.fieldLength];

    ///Todo: 类型解析, 默认值设置, 是否为空设置, 注释设置, 索引设置, 主键设置, 自增设置, 字符集设置, 排序规则设置, 检查设置, 外键设置, 表达式设置
    let sql = `ALTER TABLE ${dbName}.${tableName} ADD COLUMN ${fieldName} ${getType(fieldType, fieldLength)}`;
    console.log('达梦数据库SQL：', sql);
    return sql;
}


/*
获取字段类型SQL表示, 以mysql的类型为标准, 即实现 mysql -> 达梦的类型转换
 */
function getType(type, len) {
    switch(type) {

        //数值类型
        //todo 长度待指定
        case 'TINYINT':
            return `TINYINT`;
        case 'SMALLINT':
            return `SMALLINT`;
        case 'INT':
            return `INT`;
        case 'BIGINT':
            return `BIGINT`;
        case 'FLOAT':
            return `FLOAT`;
        case 'DOUBLE':
            return `DOUBLE`;
        case 'DECIMAL':
            return `DECIMAL`;

        //日期时间类型
        case 'Date':
            return `DATE`;
        case 'Time':
            return `TIME`;
        case 'TIMESTAMP':
            return `TIMESTAMP`;

        //时间间隔类型, mysql中没有对应的类型
        case 'INTERVAL YEAR':
            return `INTERVAL YEAR${len}`;//年间隔，即两个日期之间的年数字，P 为时间间隔的首项字段精度(后面简称为：首精度)
        case 'INTERVAL MONTH':
            return `INTERVAL MONTH${len}`;//月间隔，即两个日期之间的月数字，P 为时间间隔的首项字段精度(后面简称为：首精度)
        case 'INTERVAL DAY':
            return `INTERVAL DAY${len}`;//日间隔，即两个日期之间的日数字，P 为时间间隔的首项字段精度(后面简称为：首精度)
        case 'INTERVAL HOUR':
            return `INTERVAL HOUR${len}`;//时间隔，即两个日期之间的时数字，P 为时间间隔的首项字段精度(后面简称为：首精度)
        case 'INTERVAL MINUTE':
            return `INTERVAL MINUTE${len}`;//分间隔，即两个日期之间的分数字，P 为时间间隔的首项字段精度(后面简称为：首精度)
        case 'INTERVAL SECOND':
            return `INTERVAL SECOND${len}`;//秒间隔，即两个日期之间的秒数字，P 为时间间隔的首项字段精度(后面简称为：首精度)


        //字符类型
        case 'CHAR':
            return `CHAR(${len})`; ///TODO 长度计算规则有差异
        case 'VARCHAR':
            return `VARCHAR(${len})`; //

        //多媒体类型
        case 'TINYBLOB':
        case 'MEDIUMBLOB':
        case 'LONGBLOB':
        case 'BLOB':
            return `BLOB`;


        //文本类型
        case 'TINYTEXT':
        case 'MEDIUMTEXT':
        case 'LONGTEXT':
        case 'TEXT':    ///FIXME java的数据类型能够在达梦数据库中找到多个对应的数据类型, 需要确定一个具体的数据类型
            return `TEXT`; //  TEXT/LONGVARCHAR变长字符串类型，其字符串的长度最大为 100G-1，可用于存储长的文本串。


        //二进制类型, mysql中没有对应的类型
        case 'TINYINT(1)':
            return `BOOLEAN`; // \布尔类型，用于存储逻辑值，其值为 TRUE 或 FALSE。


        case 'BFILE': ///FIXME 未找到对应的数据类型, 貌似为达梦独有的数据类型
            return `BFILE`;

    }
}


export default {
    generateAddColumnSQL
}
