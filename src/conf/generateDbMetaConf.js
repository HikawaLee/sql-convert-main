import tableConfKeys from "@/types/tableConfKeys.js";
import inputType from "@/types/inputType.js";
import dbConf from "@/types/dbConf.js";

/**
 * 将数据库类型配置单独抽出为函数, 在配置对象中直接调用函数即可，方便维护
 * 快速生成数据库类型的表单配置: 默认值为选择所有数据库类型
 * 如果要修改默认值，可以传入 defaultDb 参数, 特别的如果默认值为不选择任何数据库类型，可以传入空数组
 * @param defaultDb 目标数据库的默认值
 * @returns {{}} 一个对象, 该对象用于配置多选框组件，用于选择数据库类型
 */
const generateDbMetaConf = (defaultDb = [dbConf.mysql, dbConf.oracle, dbConf.dameng, dbConf.tdsql]) => {
    // 如果传入的 defaultDb 是空数组，则返回不包含 [tableConfKeys.DEFAULT]: defaultDb 的对象
    if (Array.isArray(defaultDb) && defaultDb.length === 0) {
        // 否则返回包含 [tableConfKeys.DEFAULT]: defaultDb 的对象
        return {
            [tableConfKeys.COMPONENT_TYPE]: inputType.CHECKBOX,
            [tableConfKeys.TITLE]: dbConf.dbType,
            [tableConfKeys.REQUIRED]: {
                [tableConfKeys.REQUIRED_MSG]: "请选择数据库类型",
            },
            [tableConfKeys.VALUE]: {
                [tableConfKeys.COMPONENT_TYPE]: String,

            },
            [tableConfKeys.OPTIONS]: [
                dbConf.dameng,
                dbConf.mysql,
                dbConf.oracle,
                dbConf.tdsql,
            ],
        };
    }

    // 否则返回包含 [tableConfKeys.DEFAULT]: defaultDb 的对象
    return {
        [tableConfKeys.COMPONENT_TYPE]: inputType.CHECKBOX,
        [tableConfKeys.TITLE]: dbConf.dbType,
        [tableConfKeys.REQUIRED]: {
            [tableConfKeys.REQUIRED_MSG]: "请选择数据库类型",
        },
        [tableConfKeys.VALUE]: {
            [tableConfKeys.COMPONENT_TYPE]: String,
            [tableConfKeys.DEFAULT]: defaultDb,
        },
        [tableConfKeys.OPTIONS]: [
            dbConf.dameng,
            dbConf.mysql,
            dbConf.oracle,
            dbConf.tdsql,
        ],
    };
};

export default generateDbMetaConf;
