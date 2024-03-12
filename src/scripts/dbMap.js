import mysql_func from "./mysql_func.js";
import oracle_func from "./oracle_func.js";
import dameng_func from "./dameng_func.js";
import dbConf from "../types/dbConf.js";
import sqlBuilder from "./sqlBuilder.js";

export default {
    // [dbConf.mysql] : mysql_func,
    // [dbConf.oracle] : oracle_func,
    // [dbConf.dameng] : dameng_func,

    // modify: [mysql_func.generateModifyColumnSQL, oracle_func.generateModifyColumnSQL, dameng_func.generateModifyColumnSQL],
    // delete: [mysql_func.generateDeleteColumnSQL, oracle_func.generateDeleteColumnSQL, dameng_func.generateDeleteColumnSQL],
    // addIndex: [mysql_func.generateAddIndexSQL, oracle_func.generateAddIndexSQL, dameng_func.generateAddIndexSQL],
    // modifyIndex: [mysql_func.generateModifyIndexSQL, oracle_func.generateModifyIndexSQL, dameng_func.generateModifyIndexSQL],

    add: sqlBuilder.generateSQL,
    // modify: {
    //     [dbConf.mysql]: mysql_func.generateModifyColumnSQL,
    //     [dbConf.oracle]: oracle_func.generateModifyColumnSQL,
    //     [dbConf.dameng]: dameng_func.generateModifyColumnSQL
    // },
    // delete: {
    //     [dbConf.mysql]: mysql_func.generateDeleteColumnSQL,
    //     [dbConf.oracle]: oracle_func.generateDeleteColumnSQL,
    //     [dbConf.dameng]: dameng_func.generateDeleteColumnSQL
    // },
    // addIndex: {
    //     [dbConf.mysql]: mysql_func.generateAddIndexSQL,
    //     [dbConf.oracle]: oracle_func.generateAddIndexSQL,
    //     [dbConf.dameng]: dameng_func.generateAddIndexSQL
    // },

}
