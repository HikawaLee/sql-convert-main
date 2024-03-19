import inputType from '../types/inputType.js'
import actionType from "../types/actionType.js";
import dbConf from "../types/dbConf.js";
import rulesType from "@/types/rulesType.js";
// 布局配置对象, 用于生成表单, 每个对象对应一个操作, 每个操作包含一个或多个输入框, 下拉框, 复选框等, 用于生成表单
const actions = [
    {
            //新增字段
            "desc": actionType.ADD,
            "layout": [
                {
                    "type": inputType.INPUT,
                    "title": dbConf.dbName,
                    "required": {
                        "message": "请选择要修改数据库的数据库名, 注意: 执行时若报权限错误, 请先申请对应的数据库操作权限或者切换到对应身份!",
                    },
                    "value": {
                        "type": String,
                        "default": "test_db",
                    },
                    "desc": "数据库名称, 注意: 请勿输入中文",
                    "placeholder": "数据库名不能含有空格",
                    "rules": {
                        [rulesType.dataType]: rulesType.alphaRegex, //FIXME 组件引用获取后似乎变成了字符串
                    },
                },
                {
                    "type": inputType.INPUT,
                    "title": dbConf.tableName,
                    "required": {
                        "message": "请填入要修改表的表名, 例如: test, 注意: 请勿输入中文",
                    },
                    "value": {
                        "type": String,
                        "default": "test_user",
                    },
                    "desc": "数据库名称, 注意: 请勿输入中文",
                    "placeholder": "表名不能含有空格",
                    "rules": {
                        [rulesType.dataType]: rulesType.alphaRegex
                    },
                },
                {
                    "type": inputType.SELECT,
                    "title": dbConf.fieldType,
                    "required": {
                        "message": "请选择字段类型",
                    },
                    "placeholder": "",
                    "value": {
                        "type": String,
                        "default": dbConf.STDstr,
                    },
                    "options": [
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
                    "type": inputType.INPUT,
                    "title": dbConf.fieldName,
                    "required": {
                        "message": "请填入字段名, 例如: test",
                    },
                    "value": {
                        "type": String,
                        "default": "t_id",
                    },
                    "desc": "字段名称不能含有空格",
                    "rules": {
                        [rulesType.dataType]: rulesType.alphaRegex,
                    },
                },
                {
                    "type": inputType.INPUT,
                    "title": dbConf.fieldLength,
                    "value": {
                        "type": Number,
                        "default": 16, ////TODO 数据库的各种类型的长度限制该如何统一管理?
                    },
                    "desc": "请输入字段长度, 例如: 10",
                    "rules": {
                        [rulesType.dataType]: rulesType.numberRegex,
                        [rulesType.min]: 1,
                    }

                },
                {
                    "type": inputType.INPUT,
                    "title": dbConf.setDefault,
                    "value": {
                        "type": String,
                        "default": "",
                    },
                },
                {
                  type: inputType.INPUT,
                  title: dbConf.fieldPrecision,
                    value: {
                        type: Number,
                        default: 0,
                    },
                    "rules": {
                        [rulesType.dataType]: rulesType.numberRegex,
                        [rulesType.min]: 0,
                    }
                },

                {
                    "type": inputType.CHECKBOX,
                    "title": dbConf.dbType,
                    "value": {
                        "type": String,
                        "default": [dbConf.mysql, dbConf.oracle, dbConf.dameng, dbConf.tdsql],
                    },
                    "options":
                        [
                            dbConf.dameng,
                            dbConf.mysql,
                            dbConf.oracle,
                            dbConf.tdsql,
                        ],
                },
                {
                    "type": inputType.TOGGLE,
                    "title": dbConf.bigTableLabel,
                    "value": {
                        "type": String,
                        "default": "否",
                    },
                    "options": ["是", "否"],
                },
            ],
    },



    {
        "desc": actionType.DELETE,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldName,
                "required": {
                    "message": "请填入字段名, 例如: test",
                },
                "value": {
                    "type": String,
                    "default": "t_id",
                },
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldLength,
                "value": {
                    "type": String,
                    "default": "",
                },

            },
            {
                "type": inputType.SELECT,
                "title": dbConf.fieldType,
                "required": {
                    "message": "请选择字段类型",
                },
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "String(Java兼容)",
                },
                "options": [
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
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },

        ],
    },

    {
        "desc": actionType.MODIFY,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldName,
                "required": {
                    "message": "请填入字段名, 例如: test",
                },
                "value": {
                    "type": String,
                    "default": "t_id",
                },
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldLength,
                "value": {
                    "type": String,
                    "default": "",
                },

            },
            {
                "type": inputType.SELECT,
                "title": dbConf.fieldType,
                "required": {
                    "message": "请选择字段类型",
                },
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "String(Java兼容)",
                },
                "options": [
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
                "type": inputType.SELECT,
                "title": dbConf.setNewFieldType,
                "required": {
                    "message": "请选择新的字段类型",
                },
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "String(Java兼容)",
                },
                "options": [
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
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.setNullable,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },

        ],
    },

    {
        "desc": actionType.RENAMETABLE,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.newTableName,
                "required": {
                    "message": "请填入新表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.bigTableLabel,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],
    },

    {
        "desc": actionType.ADDINDEX,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldName,
                "required": {
                    "message": "请填入索引字段, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldIndex,
                "required": {
                    "message": "请填入索引名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.bigTableLabel,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],
    },


    {
        "desc": actionType.DELETEINDEX,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldIndex,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.bigTableLabel,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],
    },

    {
        "desc": actionType.REBUILDINDEX,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldIndex,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.bigTableLabel,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],
    },

    {
        "desc": actionType.ADDPRIMARYKEY,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.bigTableLabel,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],


    },
    {
        "desc": actionType.DELETEPRIMARYKEY,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.bigTableLabel,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],
    },
    {
        //新增字段
        "desc": actionType.MODIFYPRIAMRYKEY,
        "layout": [
            {
                "type": inputType.INPUT,
                "title": dbConf.dbName,
                "required": {
                    "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "trigger": "blur",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                "rules": {}, //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.tableName,
                "required": {
                    "message": "请填入表名, 例如: test, 注意: 请勿输入中文",
                },
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": {},
            },
            {
                "type": inputType.INPUT,
                "title": dbConf.fieldName,
                "required": {
                    "message": "请填入字段名, 例如: test",
                },
                "value": {
                    "type": String,
                    "default": "t_id",
                },
            },

            {
                "type": inputType.INPUT,
                "title": dbConf.primaryKeyName,
                "value": {
                    "type": String,
                    "default": "",
                },
            },
            {
                type: inputType.INPUT,
                title: dbConf.newPrimaryKeyName,
                value: {
                    type: String,
                    default: "",
                },
            },
            {
                "type": inputType.SELECT,
                "title": dbConf.fieldType,
                "required": {
                    "message": "请选择字段类型",
                },
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "String(Java兼容)",
                },
                "options": [
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
                "type": inputType.CHECKBOX,
                "title": dbConf.dbType,
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    [
                        dbConf.dameng,
                        dbConf.mysql,
                        dbConf.oracle,
                        dbConf.tdsql,
                    ],
            },
            {
                "type": inputType.TOGGLE,
                "title": dbConf.bigTableLabel,
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],
    },

]


export default actions.map((action) => {
    return {
        name: action.desc,
        action: action
    }
})





