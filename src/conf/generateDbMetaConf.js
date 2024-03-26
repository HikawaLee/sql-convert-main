import tableConfKeys from "@/types/tableConfKeys.js";
import inputType from "@/types/inputType.js";
import dbConf from "@/types/dbConf.js";

/**
 * 快速生成数据库类型的表单配置
 * @param defaultDb
 * @returns {{}}
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
