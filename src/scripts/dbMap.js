import {generateAddColumnSQL} from "./mysql_func.js";
import damengFunc from "./dameng_func.js";
import oracleFunc from "./oracle_func.js";

import dbConf from "../types/dbConf.js";
import temp from "./temp.js";
// Now you can use the functions:
const addColumnMySQL = generateAddColumnSQL;
const addColumnOracle = oracleFunc.generateAddColumnSQL;
const addColumnDameng = damengFunc.generateAddColumnSQL;
export const test = temp.test;
export const test2 = temp.test2;
export const test3 = temp.test3;
export default{
    add: {
        [dbConf.mysql]: addColumnMySQL,
        [dbConf.oracle]: addColumnOracle,
        [dbConf.dameng]: addColumnDameng
    },
    delete: {
        [dbConf.mysql]: 'generateDeleteColumnSQL',
        [dbConf.oracle]: 'generateDeleteColumnSQL',
        [dbConf.dameng]: 'generateDeleteColumnSQL'
    },
    test: {
        [dbConf.mysql]: temp.test,
        [dbConf.oracle]: temp.test2,
        [dbConf.dameng]: temp.test3,
    }

}


