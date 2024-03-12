import inputType from '../types/inputType.js'
import actionType from "../types/actionType.js";
import dbConf from "../types/dbConf.js";
const actions = [
    {
            "desc": actionType.ADD,
            "layout": [
                {
                    "type": inputType.INPUT,
                    "title": "数据库名",
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
                    "type": "input",
                    "title": "表名",
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
                    "title": "字段名",
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
                    "title": "字段长度",
                    "value": {
                        "type": String,
                        "default": "",
                    },

                },
                {
                    "type": inputType.SELECT,
                    "title": "字段类型",
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
                    "title": "目标数据库",
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
                    "title": "是否大表",
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
                "title": "数据库名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [], //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": "表名",
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
                "title": "字段名",
                "value": {
                    "type": String,
                    "default": "",
                },
            },
            {
                "type": inputType.INPUT,
                "title": "字段长度",
                "value": {
                    "type": String,
                    "default": "",
                },

            },
            {
                "type": inputType.SELECT,
                "title": "字段类型",
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "VARCHAR",
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
                "title": "目标数据库",
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
                "title": "数据库名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [], //校验规则, 待定
            },
            {
                "type": inputType.INPUT,
                "title": "表名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [],
            },
            {
                "type": inputType.INPUT,
                "title": "字段名",
                "value": {
                    "type": String,
                    "default": "",
                },
            },
            {
                "type": inputType.INPUT,
                "title": "字段长度",
                "value": {
                    "type": String,
                    "default": "",
                },

            },
            {
                "type": inputType.SELECT,
                "title": "字段类型",
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
  
        ],
    },

    //
    // {
    //     "desc": "修改主键",
    //     "layout": [
    //         {
    //             "type": "input",
    //             "title": "数据库名",
    //             "value": {
    //                 "type": String,
    //                 "default": "",
    //             },
    //             "rules": [], //校验规则, 待定
    //         },
    //         {
    //             "type": "input",
    //             "title": "表名",
    //             "value": {
    //                 "type": String,
    //                 "default": "",
    //             },
    //             "rules": [],
    //         },
    //         {
    //             "type": "input",
    //             "title": "字段名",
    //             "value": {
    //                 "type": String,
    //                 "default": "",
    //             },
    //         },
    //         {
    //             "type": "input",
    //             "title": "字段长度",
    //             "value": {
    //                 "type": String,
    //                 "default": "",
    //             },
    //
    //         },
    //         {
    //             "type": "select",
    //             "title": "字段类型",
    //             "placeholder": "",
    //             "value": {
    //                 "type": String,
    //                 "default": "String(Java兼容)",
    //             },
    //             "options": [
    //                 "String(Java兼容)",
    //                 "Date(Java兼容)",
    //                 "Number(Java兼容)",
    //                 "Byte[](Java兼容)",
    //             ],
    //         },
    //
    //     ],
    // },
    //
    //
    // {
    //     "desc": "修改索引",
    //     "layout": [
    //         {
    //             "type": "input",
    //             "title": "数据库名名非常长数据库名",
    //             "value": {
    //                 "type": String,
    //                 "default": "",
    //             },
    //             "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
    //             "rules": [], //校验规则, 待定
    //         },
    //         {
    //             "type": "input",
    //             "title": "表名",
    //             "value": {
    //                 "type": String,
    //                 "default": "",
    //             },
    //             "rules": [],
    //         },
    //         {
    //             "type": "select",
    //             "title": "字段类型",
    //             "placeholder": "",
    //             "value": {
    //                 "type": String,
    //                 "default": "String(Java兼容)",
    //             },
    //             "options": [
    //                 "String(Java兼容)",
    //                 "Date(Java兼容)",
    //                 "Number(Java兼容)",
    //                 "Byte[](Java兼容)",
    //             ],
    //         },
    //         {
    //             "type": "checkbox",
    //             "title": "目标数据库",
    //             "value": {
    //                 "type": String,
    //                 "default": "达梦",
    //             },
    //             "options":
    //                 ["达梦",
    //                     "TD SQL",
    //                 ],
    //         },
    //         {
    //             "type": "toggle",
    //             "title": "是否大表",
    //             "value": {
    //                 "type": String,
    //                 "default": "否",
    //             },
    //             "options": ["是", "否"],
    //         },
    //     ],
    // },
    //
    //
    // {
    //     "desc": "测试自动布局",
    //     "layout": [
    //         {
    //             "type": "input",
    //             "title": "数据库名名非常长数据库名",
    //             "value": {
    //                 "type": String,
    //                 "default": "",
    //             },
    //             "desc": "请选择要迁移的数据库, 例如: test, 注意: 请勿输入中文",
    //             "rules": [], //校验规则, 待定
    //         },
    //
    //         {
    //             "type": "select",
    //             "title": "字段类型",
    //             "placeholder": "",
    //             "value": {
    //                 "type": String,
    //                 "default": "String(Java兼容)",
    //             },
    //             "options": [
    //                 "String(Java兼容)",
    //                 "Date(Java兼容)",
    //                 "Number(Java兼容)",
    //                 "Byte[](Java兼容)",
    //             ],
    //         },
    //         {
    //             "type": "checkbox",
    //             "title": "目标数据库",
    //             "value": {
    //                 "type": String,
    //                 "default": "达梦",
    //             },
    //             "options":
    //                 ["达梦",
    //                     "TD SQL",
    //                 ],
    //         },
    //         {
    //             "type": "toggle",
    //             "title": "是否大表",
    //             "value": {
    //                 "type": String,
    //                 "default": "否",
    //             },
    //             "options": ["是", "否"],
    //         },
    //     ],
    // },

]


export default actions.map((action) => {
    return {
        name: action.desc,
        action: action
    }
})





