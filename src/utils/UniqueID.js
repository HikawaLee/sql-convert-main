import {nanoid} from "nanoid";
const UniqueID = (length = 10) => {
    return nanoid(length);
}
export default UniqueID;