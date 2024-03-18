import inputType from '../types/inputType.js'
import actionType from "../types/actionType.js";
import dbConf from "../types/dbConf.js";
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
                        "message": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                        "trigger": "blur",
                    },
                    "value": {
                        "type": String,
                        "default": "",
                    },
                    "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
                    "rules": [], //校验规则, 待定
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
                    "rules": [],
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
                // {
                //     "type": "radio",
                //     "title": "大小表切换",
                //     "value": {
                //         "type": String,
                //         "default": "小表",
                //     },
                //     "options": ["大表", "小表"],
                // },
                // {
                //     "type": "radio",
                //     "title": "是否大表",
                //     "value": {
                //         "type": String,
                //         "default": "否",
                //     },
                //     "options": ["是", "否"],
                // },
                // {
                //     "type": "textarea",
                //     "title": "目标SQL输出",
                // }
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
            // {
            //     "type": "radio",
            //     "title": "大小表切换",
            //     "value": {
            //         "type": String,
            //         "default": "小表",
            //     },
            //     "options": ["大表", "小表"],
            // },
            // {
            //     "type": "radio",
            //     "title": "是否大表",
            //     "value": {
            //         "type": String,
            //         "default": "否",
            //     },
            //     "options": ["是", "否"],
            // },
            // {
            //     "type": "textarea",
            //     "title": "目标SQL输出",
            // }
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
                "rules": [],
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
                "rules": [],
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
                "rules": [],
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
                "rules": [],
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
                "rules": [],
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
                "rules": [],
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
                "rules": [], //校验规则, 待定
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
                "rules": [],
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
            // {
            //     "type": "radio",
            //     "title": "大小表切换",
            //     "value": {
            //         "type": String,
            //         "default": "小表",
            //     },
            //     "options": ["大表", "小表"],
            // },
            // {
            //     "type": "radio",
            //     "title": "是否大表",
            //     "value": {
            //         "type": String,
            //         "default": "否",
            //     },
            //     "options": ["是", "否"],
            // },
            // {
            //     "type": "textarea",
            //     "title": "目标SQL输出",
            // }
        ],
    },

]


export default actions.map((action) => {
    return {
        name: action.desc,
        action: action
    }
})





