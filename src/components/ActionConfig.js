export default [
    {
            "desc": "增加字段",
            "layout": [
                {
                    "type": "input",
                    "title": "数据库名名非常长数据库名",
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
                    "value": {
                        "type": String,
                        "default": "",
                    },
                    "rules": [],
                },
                {
                    "type": "input",
                    "title": "字段名",
                    "value": {
                        "type": String,
                        "default": "",
                    },
                },
                {
                    "type": "input",
                    "title": "字段长度",
                    "value": {
                        "type": String,
                        "default": "",
                    },

                },
                {
                    "type": "select",
                    "title": "字段类型",
                    "placeholder": "",
                    "value": {
                        "type": String,
                        "default": "String(Java兼容)",
                    },
                    "options": [
                        "String(Java兼容)",
                        "Date(Java兼容)",
                        "Number(Java兼容)",
                        "Byte[](Java兼容)",
                    ],
                },
                {
                    "type": "checkbox",
                    "title": "目标数据库",
                    "value": {
                        "type": String,
                        "default": "达梦",
                    },
                    "options":
                        ["达梦",
                        "TD SQL",
                        ],
                },
                {
                    "type": "toggle",
                    "title": "是否大表",
                    "value": {
                        "type": String,
                        "default": "否",
                    },
                    "options": ["是", "否"],
                },
                {
                    "type": "radio",
                    "title": "大小表切换",
                    "value": {
                        "type": String,
                        "default": "小表",
                    },
                    "options": ["大表", "小表"],
                },
                {
                    "type": "radio",
                    "title": "是否大表",
                    "value": {
                        "type": String,
                        "default": "否",
                    },
                    "options": ["是", "否"],
                },
                {
                    "type": "textarea",
                    "title": "目标SQL输出",
                }
            ],
    },
    {
        "desc": "减少字段",
        "layout": [
            {
                "type": "input",
                "title": "数据库名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [], //校验规则, 待定
            },
    
            {
                "type": "input",
                "title": "字段名",
                "value": {
                    "type": String,
                    "default": "",
                },
            },
            {
                "type": "input",
                "title": "字段长度",
                "value": {
                    "type": String,
                    "default": "",
                },

            },
            {
                "type": "select",
                "title": "字段类型",
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "String(Java兼容)",
                },
                "options": [
                    "String(Java兼容)",
                    "Date(Java兼容)",
                    "Number(Java兼容)",
                    "Byte[](Java兼容)",
                ],
            },
            {
                "type": "checkbox",
                "title": "目标数据库",
                "value": {
                    "type": String,
                    "default": "达梦",
                },
                "options":
                    ["达梦",
                        "TD SQL",
                    ],
            },
            {
                "type": "radio",
                "title": "是否大表",
                "value": {
                    "type": String,
                    "default": "否",
                },
                "options": ["是", "否"],
            },
        ],
    },


    {
        "desc": "修改字段",
        "layout": [
            {
                "type": "input",
                "title": "数据库名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [], //校验规则, 待定
            },
            {
                "type": "input",
                "title": "表名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [],
            },
            {
                "type": "input",
                "title": "字段名",
                "value": {
                    "type": String,
                    "default": "",
                },
            },
            {
                "type": "input",
                "title": "字段长度",
                "value": {
                    "type": String,
                    "default": "",
                },

            },
            {
                "type": "select",
                "title": "字段类型",
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "String(Java兼容)",
                },
                "options": [
                    "String(Java兼容)",
                    "Date(Java兼容)",
                    "Number(Java兼容)",
                    "Byte[](Java兼容)",
                ],
            },
  
        ],
    },


    {
        "desc": "修改主键",
        "layout": [
            {
                "type": "input",
                "title": "数据库名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [], //校验规则, 待定
            },
            {
                "type": "input",
                "title": "表名",
                "value": {
                    "type": String,
                    "default": "",
                },
                "rules": [],
            },
            {
                "type": "input",
                "title": "字段名",
                "value": {
                    "type": String,
                    "default": "",
                },
            },
            {
                "type": "input",
                "title": "字段长度",
                "value": {
                    "type": String,
                    "default": "",
                },

            },
            {
                "type": "select",
                "title": "字段类型",
                "placeholder": "",
                "value": {
                    "type": String,
                    "default": "String(Java兼容)",
                },
                "options": [
                    "String(Java兼容)",
                    "Date(Java兼容)",
                    "Number(Java兼容)",
                    "Byte[](Java兼容)",
                ],
            },

        ],
    },


]





