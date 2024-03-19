import {nanoid} from "nanoid";

// 生成唯一ID
const UniqueID = (length = 10) => {
    return nanoid(length);
}
export default UniqueID;