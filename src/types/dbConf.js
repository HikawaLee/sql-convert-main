export default {


    //region 目标数据库类型
    mysql: 'MySQL',
    oracle: 'Oracle',
    dameng: '达梦',
    tdsql: 'TD-SQL',
    postgres: 'PostgreSQL',
    //endregion


    //region 前端自定义标准字段类型
    STDint2_t: 'STDint2_t',
    STDint3_t: 'STDint3_t',
    STDint4_t: 'STDint4_t',
    STDint6_t: 'STDint6_t',
    STDint8_t: 'STDint8_t',
    STDint10_t: 'STDint10_t',
    STDdouble: 'STDdouble',
    STDchar: 'STDchar',
    STDstr: 'STDstr',
    STDdate: 'STDdate',
    STDtime: 'STDtime',
    STDdatetime: 'STDdatetime',
    STDtimestamp: 'STDtimestamp',
    STDclob: 'STDclob',
    STDBlob: 'STDBlob',
    //endregion


    //region 数据库中各类型的默认长度, 精度...
    mysqlDecimalP: 10,
    mysqlDecimalD: 0,

    oracleDecimalP: 10,
    oracleDecimalS: 0,

    bigTableLabel: '是否大表',
    bigTable: '大表',
    dbType: '目标数据库',
    dbName: '数据库名',
    tableName: '表名',
    primaryKeyName: '主键名',
    genHistoryTable: '生成历史表',
    hisTableName: '历史表名',

    newPrimaryKeyName: '新主键名',
    newTableName: '新表名',
    setDefault: '设置默认值',
    setNullable: '设置允许为空',
    nullable: '允许为空',
    setNewFieldType: '设置新字段类型',


    fieldName: '字段名',
    fieldType: '字段类型',
    fieldLength: '字段长度',
    fieldPrecision: '字段精度',
    fieldDefault: '默认值',
    fieldNullable: '是否为空',
    fieldComment: '字段注释',
    fieldIndex: '索引名',
    fieldIndexType: '索引类型',
    fieldUnique: '唯一索引',
    fieldPrimaryKey: '主键',
    fieldAutoIncrement: '自增',
    fieldUnsigned: '无符号',
    fieldZerofill: '补零',
    fieldCharset: '字符集',
    fieldCollation: '排序规则',
    fieldCheck: '检查',
    fieldReference: '外键',
    fieldExpression: '表达式',
    fieldFunction: '函数',
    fieldConstraint: '约束',

}