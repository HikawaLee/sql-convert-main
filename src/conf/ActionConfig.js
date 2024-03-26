import inputType from '@/types/inputType.js'
import actionType from "@/types/actionType.js";
import dbConf from "@/types/dbConf.js";
import rulesType from "@/types/rulesType.js";
import tableConfKeys from "@/types/tableConfKeys.js";
import generateDbMetaConf from "@/conf/generateDbMetaConf.js";
// 布局配置对象, 用于生成表单, 每个对象对应一个操作, 每个操作包含一个或多个输入框, 下拉框, 复选框等, 用于生成表单
const actions = [
    {
            //新增字段
            [tableConfKeys.DESC]: actionType.ADD,
            [tableConfKeys.LAYOUT]: [
                {
                    [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                    [tableConfKeys.TITLE]: dbConf.dbName,
                    [tableConfKeys.REQUIRED]: {
                        [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                    },
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.VALUETYPE]: String,
                        [tableConfKeys.DEFAULT]: "dbtrade",
                    },
                    [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                    [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                    [tableConfKeys.RULES]: {
                        [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                    },
                },
                {
                    [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                    [tableConfKeys.TITLE]: dbConf.tableName,
                    [tableConfKeys.REQUIRED]: {
                        [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                    },
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.COMPONENT_TYPE]: String,
                        [tableConfKeys.DEFAULT]: "test_user",
                    },
                    [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                    [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                    [tableConfKeys.RULES]: {
                        [rulesType.dataType]: rulesType.alphaRegex
                    },
                },

                {
                    [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                    [tableConfKeys.TITLE]: dbConf.fieldName,
                    [tableConfKeys.REQUIRED]: {
                        [tableConfKeys.REQUIRED_MSG]: "请填入字段名, 例如: test",
                    },
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.COMPONENT_TYPE]: String,
                        [tableConfKeys.DEFAULT]: "t_id",
                    },
                    [tableConfKeys.DESC]: "字段名称不能含有空格",
                    [tableConfKeys.RULES]: {
                        [rulesType.dataType]: rulesType.alphaRegex,
                    },
                },
                {
                    [tableConfKeys.COMPONENT_TYPE]: inputType.SELECT,
                    [tableConfKeys.TITLE]: dbConf.fieldType,
                    [tableConfKeys.REQUIRED]: {
                        [tableConfKeys.REQUIRED_MSG]: "请选择字段类型",
                    },
                    [tableConfKeys.PLACEHOLDER]: "",
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.COMPONENT_TYPE]: String,
                        [tableConfKeys.DEFAULT]: dbConf.STDstr,
                    },
                    [tableConfKeys.OPTIONS]: [
                        dbConf.STDint2_t,
                        dbConf.STDint3_t,
                        dbConf.STDint4_t,
                        dbConf.STDint6_t,
                        dbConf.STDint8_t,
                        dbConf.STDint10_t,
                        dbConf.STDdouble,
                        dbConf.STDchar,
                        dbConf.STDstr,
                        dbConf.STDdate,
                        dbConf.STDtime,
                        dbConf.STDdatetime,
                        dbConf.STDtimestamp,
                        dbConf.STDclob,
                        dbConf.STDBlob,
                    ],
                },
                {
                    [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                    [tableConfKeys.TITLE]: dbConf.fieldLength,
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.COMPONENT_TYPE]: Number,
                        [tableConfKeys.DEFAULT]: 16, ////TODO 数据库的各种类型的长度限制该如何统一管理?
                    },
                    [tableConfKeys.DESC]: "请输入字段长度, 例如: 10",
                    [tableConfKeys.RULES]: {
                        [rulesType.dataType]: rulesType.numberRegex,
                        [rulesType.min]: 1,
                    }

                },
                {
                  type: inputType.INPUT,
                  title: dbConf.fieldPrecision,
                    value: {
                        type: Number,
                        default: 0,
                    },
                    [tableConfKeys.RULES]: {
                        [rulesType.dataType]: rulesType.numberRegex,
                        [rulesType.min]: 0,
                    }
                },
                {
                    [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                    [tableConfKeys.TITLE]: dbConf.setDefault,
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.COMPONENT_TYPE]: String,
                        [tableConfKeys.DEFAULT]: "",
                    },
                },
                generateDbMetaConf()
            ],
    },
    {
        [tableConfKeys.DESC]: actionType.DELETE,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入字段名, 例如: test",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "t_id",
                },
                [tableConfKeys.DESC]: "字段名称不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },
            generateDbMetaConf(),
        ],
    },
    {
        [tableConfKeys.DESC]: actionType.MODIFY,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入字段名, 例如: test",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "t_id",
                },
                [tableConfKeys.DESC]: "字段名称不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.SELECT,
                [tableConfKeys.TITLE]: dbConf.fieldType,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择字段类型",
                },
                [tableConfKeys.PLACEHOLDER]: "",
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: dbConf.STDstr,
                },
                [tableConfKeys.OPTIONS]: [
                    dbConf.STDint2_t,
                    dbConf.STDint3_t,
                    dbConf.STDint4_t,
                    dbConf.STDint6_t,
                    dbConf.STDint8_t,
                    dbConf.STDint10_t,
                    dbConf.STDdouble,
                    dbConf.STDchar,
                    dbConf.STDstr,
                    dbConf.STDdate,
                    dbConf.STDtime,
                    dbConf.STDdatetime,
                    dbConf.STDtimestamp,
                    dbConf.STDclob,
                    dbConf.STDBlob,
                ],
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.SELECT,
                [tableConfKeys.TITLE]: dbConf.setNewFieldType,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择字段类型",
                },
                [tableConfKeys.PLACEHOLDER]: "",
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: dbConf.STDstr,
                },
                [tableConfKeys.OPTIONS]: [
                    dbConf.STDint2_t,
                    dbConf.STDint3_t,
                    dbConf.STDint4_t,
                    dbConf.STDint6_t,
                    dbConf.STDint8_t,
                    dbConf.STDint10_t,
                    dbConf.STDdouble,
                    dbConf.STDchar,
                    dbConf.STDstr,
                    dbConf.STDdate,
                    dbConf.STDtime,
                    dbConf.STDdatetime,
                    dbConf.STDtimestamp,
                    dbConf.STDclob,
                    dbConf.STDBlob,
                ],
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldLength,
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: Number,
                    [tableConfKeys.DEFAULT]: 16, ////TODO 数据库的各种类型的长度限制该如何统一管理?
                },
                [tableConfKeys.DESC]: "请输入字段长度, 例如: 10",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.numberRegex,
                    [rulesType.min]: 1,
                }

            },
            {
                type: inputType.INPUT,
                title: dbConf.fieldPrecision,
                value: {
                    type: Number,
                    default: 0,
                },
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.numberRegex,
                    [rulesType.min]: 0,
                }
            },
            generateDbMetaConf(),
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.TOGGLE,
                [tableConfKeys.TITLE]: dbConf.setNullable,
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "不允许为空",
                },
                [tableConfKeys.OPTIONS]: ["是", "否"],
            },
        ],
    },
    {
        [tableConfKeys.DESC]: actionType.ADDINDEX,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入字段名, 例如: test",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "t_id",
                },
                [tableConfKeys.DESC]: "字段名称不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldIndex,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入索引名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "idx_test",
                },
                [tableConfKeys.RULES]: {},
            },
            generateDbMetaConf(),
        ],
    },
    {
        [tableConfKeys.DESC]: actionType.DELETEINDEX,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldIndex,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入索引名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "idx_test",
                },
                [tableConfKeys.RULES]: {},
            },
            generateDbMetaConf(),
        ],
    },
    {
        [tableConfKeys.DESC]: actionType.REBUILDINDEX,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldIndex,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入索引名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "idx_test",
                },
                [tableConfKeys.RULES]: {},
            },
            generateDbMetaConf(),
        ],
    },
    {
        [tableConfKeys.DESC]: actionType.ADDPRIMARYKEY,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },

            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入字段名, 例如: test",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "t_id",
                },
                [tableConfKeys.DESC]: "字段名称不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },
            generateDbMetaConf(),

        ],


    },
    {
        [tableConfKeys.DESC]: actionType.DELETEPRIMARYKEY,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },

            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入字段名, 例如: test",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "t_id",
                },
                [tableConfKeys.DESC]: "字段名称不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },
            generateDbMetaConf(),
        ],
    },
    {
        [tableConfKeys.DESC]: actionType.MODIFYPRIAMRYKEY,
        [tableConfKeys.LAYOUT]: [
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.dbName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "C##DBTRADE",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "数据库名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.tableName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "test_user",
                },
                [tableConfKeys.DESC]: "数据库名称, 注意: 请勿输入中文",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.fieldName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入字段名, 例如: test",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "t_id",
                },
                [tableConfKeys.DESC]: "字段名称不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.INPUT,
                [tableConfKeys.TITLE]: dbConf.newPrimaryKeyName,
                [tableConfKeys.REQUIRED]: {
                    [tableConfKeys.REQUIRED_MSG]: "请填入主键名, 例如: pk_userId",
                },
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "pk_userId",
                },
                [tableConfKeys.DESC]: "字段名称不能含有空格",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },

            generateDbMetaConf(),
        ],
    },
]


export default actions.map((action) => {
    return {
        name: action.desc,
        action: action
    }
})





