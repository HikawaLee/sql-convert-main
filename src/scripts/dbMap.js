import mysqlFunc from "./mysql_func.js";
import tdsqlFunc from "./tdsql_func.js";
import damengFunc from "./dameng_func.js";
import oracleFunc from "./oracle_func.js";

import dbConf from "../types/dbConf.js";
import actionType from "../types/actionType.js";

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
    },
    [actionType.MODIFY]: {
        [dbConf.mysql]: mysqlFunc.generateModifyColumnSQL,
        [dbConf.tdsql]: tdsqlFunc.generateModifyColumnSQL,
        [dbConf.oracle]: oracleFunc.generateModifyColumnSQL,
    },
    [actionType.RENAMETABLE]: {
        [dbConf.mysql]: mysqlFunc.generateRenameTableSQL,
        [dbConf.tdsql]: tdsqlFunc.generateRenameTableSQL,
        [dbConf.oracle]: oracleFunc.generateRenameTableSQL,
    },
    [actionType.ADDINDEX]: {
        [dbConf.mysql]: mysqlFunc.generateAddIndexSQL,
        [dbConf.tdsql]: tdsqlFunc.generateAddIndexSQL,
        [dbConf.oracle]: oracleFunc.generateAddIndexSQL,
    },
    [actionType.DELETEINDEX]: {
        [dbConf.mysql]: mysqlFunc.generateDropIndexSQL,
        [dbConf.tdsql]: tdsqlFunc.generateDropIndexSQL,
        [dbConf.oracle]: oracleFunc.generateDropIndexSQL,
    },
    [actionType.REBUILDINDEX]: {
        //TODO
        [dbConf.oracle]: oracleFunc.generateRebuildIndexSQL,
    },
    [actionType.ADDPRIMARYKEY]: {
        [dbConf.mysql]: mysqlFunc.generateAddPrimaryKeySQL,
        [dbConf.tdsql]: tdsqlFunc.generateAddPrimaryKeySQL,
        [dbConf.oracle]: oracleFunc.generateAddPrimaryKeySQL,
    },
    [actionType.DELETEPRIMARYKEY]: {
        [dbConf.mysql]: mysqlFunc.generateDropPrimaryKeySQL,
        [dbConf.tdsql]: tdsqlFunc.generateDropPrimaryKeySQL,
        [dbConf.oracle]: oracleFunc.generateDropPrimaryKeySQL
    }
}