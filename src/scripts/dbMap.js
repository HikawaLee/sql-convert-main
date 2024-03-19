import mysqlFunc from "./mysql_func.js";
import tdsqlFunc from "./tdsql_func.js";
import damengFunc from "./dameng_func.js";
import oracleFunc from "./oracle_func.js";
import dbConf from "../types/dbConf.js";
import actionType from "../types/actionType.js";
//SQL模板函数池, 用于根据数据库类型和操作类型生成对应的SQL, 例如: dbMap[actionType.ADD][dbConf.mysql](info)
export default {
    [actionType.ADD]:{
        [dbConf.mysql]: mysqlFunc.generateAddColumnSQL,
        [dbConf.tdsql]: tdsqlFunc.generateAddColumnSQL,
        [dbConf.oracle]: oracleFunc.generateAddColumnSQL,
        [dbConf.dameng]: damengFunc.generateAddColumnSQL,

    },
    [actionType.DELETE]:{
        [dbConf.mysql]: mysqlFunc.generateDropColumnSQL,
        [dbConf.tdsql]: tdsqlFunc.generateDropColumnSQL,
        [dbConf.oracle]: oracleFunc.generateDropColumnSQL,
        [dbConf.dameng]: damengFunc.generateDropColumnSQL,
    },
    [actionType.MODIFY]: {
        [dbConf.mysql]: mysqlFunc.generateModifyColumnSQL,
        [dbConf.tdsql]: tdsqlFunc.generateModifyColumnSQL,
        [dbConf.oracle]: oracleFunc.generateModifyColumnSQL,
        [dbConf.dameng]: damengFunc.generateModifyColumnSQL,
    },
    [actionType.RENAMETABLE]: {
        [dbConf.mysql]: mysqlFunc.generateRenameTableSQL,
        [dbConf.tdsql]: tdsqlFunc.generateRenameTableSQL,
        [dbConf.oracle]: oracleFunc.generateRenameTableSQL,
        [dbConf.dameng]: damengFunc.generateRenameTableSQL,
    },
    [actionType.ADDINDEX]: {
        [dbConf.mysql]: mysqlFunc.generateAddIndexSQL,
        [dbConf.tdsql]: tdsqlFunc.generateAddIndexSQL,
        [dbConf.oracle]: oracleFunc.generateAddIndexSQL,
        [dbConf.dameng]: damengFunc.generateAddIndexSQL,
    },
    [actionType.DELETEINDEX]: {
        [dbConf.mysql]: mysqlFunc.generateDropIndexSQL,
        [dbConf.tdsql]: tdsqlFunc.generateDropIndexSQL,
        [dbConf.oracle]: oracleFunc.generateDropIndexSQL,
        [dbConf.dameng]: damengFunc.generateDropIndexSQL,
    },
    [actionType.REBUILDINDEX]: {
        //TODO
        [dbConf.oracle]: oracleFunc.generateRebuildIndexSQL,
        [dbConf.dameng]: damengFunc.generateRebuildIndexSQL,
    },
    [actionType.ADDPRIMARYKEY]: {
        [dbConf.mysql]: mysqlFunc.generateAddPrimaryKeySQL,
        [dbConf.tdsql]: tdsqlFunc.generatePrimaryKeySQL,
        [dbConf.oracle]: oracleFunc.generateAddPrimaryKeySQL,
        [dbConf.dameng]: damengFunc.generateAddPrimaryKeySQL,
    },
    [actionType.DELETEPRIMARYKEY]: {
        [dbConf.mysql]: mysqlFunc.generateDropPrimaryKeySQL,
        [dbConf.tdsql]: tdsqlFunc.generateDropPrimaryKeySQL,
        [dbConf.oracle]: oracleFunc.generateDropPrimaryKeySQL,
        [dbConf.dameng]: damengFunc.generateDropPrimaryKeySQL,
    }
}