import mysqlFunc from "./mysql_func.js";
import damengFunc from "./dameng_func.js";
import oracleFunc from "./oracle_func.js";

import dbConf from "../types/dbConf.js";
import actionType from "../types/actionType.js";

export default {
    [actionType.ADD]:{
        [dbConf.mysql]: mysqlFunc.generateAddColumnSQL,
        [dbConf.oracle]: oracleFunc.generateAddColumnSQL,
        [dbConf.dameng]: damengFunc.generateAddColumnSQL,
    },
    [actionType.DELETE]:{
        [dbConf.oracle]: oracleFunc.generateDropColumnSQL,
    },
    [actionType.MODIFY]: {
        [dbConf.oracle]: oracleFunc.generateModifyColumnSQL,
    },
    [actionType.RENAMETABLE]: {
        [dbConf.oracle]: oracleFunc.generateRenameTableSQL,
    },
    [actionType.ADDINDEX]: {
        [dbConf.oracle]: oracleFunc.generateAddIndexSQL,
    },
    [actionType.DELETEINDEX]: {
        [dbConf.oracle]: oracleFunc.generateDropIndexSQL,
    },
    [actionType.REBUILDINDEX]: {
        [dbConf.oracle]: oracleFunc.generateRebuildIndexSQL,
    }
}