import inputType from '@/types/inputType.js'
import actionType from "@/types/actionType.js";
import dbConf from "@/types/dbConf.js";
import rulesType from "@/types/rulesType.js";
import tableConfKeys from "@/types/tableConfKeys.js";
import generateDbMetaConf from "@/conf/generateDbMetaConf.js";




import bizOptions from "@/scripts/dataType_mapping.js";




//convert the selectionOptions.keys  into arr
const optionsKeyArr = Object.keys(bizOptions);
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
                    [tableConfKeys.TITLE]: dbConf.hisTableName,
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.COMPONENT_TYPE]: String,
                        [tableConfKeys.DEFAULT]: "histest_user",
                    },
                    [tableConfKeys.DESC]: "请填入历史表的表名, 默认为表名前加his前缀, 例如: histest_user",
                    [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
                },

                {
                    [tableConfKeys.COMPONENT_TYPE]: inputType.TOGGLE,
                    [tableConfKeys.TITLE]: dbConf.genHistoryTable,
                    [tableConfKeys.VALUE]: {
                        [tableConfKeys.COMPONENT_TYPE]: String,
                        [tableConfKeys.DEFAULT]: "否",
                    },
                    [tableConfKeys.OPTIONS]: ["是", "否"],
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
                        [tableConfKeys.DEFAULT]: optionsKeyArr[0],
                    },
                    [tableConfKeys.OPTIONS]: optionsKeyArr,
                },
                // generateDbMetaConf()
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
                [tableConfKeys.TITLE]: dbConf.hisTableName,
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "histest_user",
                },
                [tableConfKeys.DESC]: "请填入历史表的表名, 默认为表名前加his前缀, 例如: histest_user",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.TOGGLE,
                [tableConfKeys.TITLE]: dbConf.genHistoryTable,
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "否",
                },
                [tableConfKeys.OPTIONS]: ["是", "否"],
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
            // generateDbMetaConf(),
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
                [tableConfKeys.TITLE]: dbConf.hisTableName,
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "histest_user",
                },
                [tableConfKeys.DESC]: "请填入历史表的表名, 默认为表名前加his前缀, 例如: histest_user",
                [tableConfKeys.PLACEHOLDER]: "表名不能含有空格",
            },
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.TOGGLE,
                [tableConfKeys.TITLE]: dbConf.genHistoryTable,
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "否",
                },
                [tableConfKeys.OPTIONS]: ["是", "否"],
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
                    [tableConfKeys.DEFAULT]: optionsKeyArr[0],
                },
                [tableConfKeys.OPTIONS]: optionsKeyArr,
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
                    [tableConfKeys.DEFAULT]: optionsKeyArr[0],
                },
                [tableConfKeys.OPTIONS]: optionsKeyArr,
            },
            // generateDbMetaConf(),
            {
                [tableConfKeys.COMPONENT_TYPE]: inputType.TOGGLE,
                [tableConfKeys.TITLE]: dbConf.setNullable,
                [tableConfKeys.VALUE]: {
                    [tableConfKeys.COMPONENT_TYPE]: String,
                    [tableConfKeys.DEFAULT]: "否",
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
            // generateDbMetaConf(),
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
            // generateDbMetaConf(),

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
            // generateDbMetaConf(),
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
                [tableConfKeys.DESC]: "注意: 目前约定主键名为: pk_表名,如果oracle目标表的主键名不为约定格式,将无法修改",
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
                [tableConfKeys.DESC]: "多个字段以逗号分隔且不加空格, 例如:  t_id,t_name;另外表中必须含有该字段且不为空值,否则会直接删除原来的主键",
                [tableConfKeys.RULES]: {
                    [rulesType.dataType]: rulesType.alphaRegex,
                },
            },
            // generateDbMetaConf(),
        ],
    },
]


export default actions.map((action) => {
    return {
        name: action[tableConfKeys.DESC],
        action: action
    }
})





