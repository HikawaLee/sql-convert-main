//
// import NamedActionMap from '@/conf/ActionConfig.js';
// import tableConfKeys from "@/types/tableConfKeys.js";
//
//
// const collectArgs = (actionType, inputData) => {
//
//
//     const activeAction = NamedActionMap.find((action) => action.name === actionType);
//     const titles = activeAction.action[tableConfKeys.LAYOUT].map((componentMeta) => {
//         return {
//             [componentMeta[tableConfKeys.TITLE]]: inputData[componentMeta[tableConfKeys.TITLE]]
//         }
//     })
//     console.log(`titles: ${JSON.stringify(titles, null, 2)}`);
//
//     return {
//
//     }
//
//     // NamedActionMap[actionType].map((action) => {
//     //     const actionName = action.name;
//     //     const dataInputTitles = action[tableConfKeys.LAYOUT].map((component) => {
//     //         return component[tableConfKeys.TITLE];
//     //     });
//     //     console.log(`actionName: ${actionName}, dataInputTitles: ${JSON.stringify(dataInputTitles, null, 2)}`)
//     //     return {
//     //         [actionName]: (dataInputTitles) => {
//     //             const data = {};
//     //             dataInputTitles.forEach((title) => {
//     //                 data[title] = inputData[title];
//     //             });
//     //             console.log(`data: ${JSON.stringify(data, null, 2)}`);
//     //             return data;
//     //         }
//     //     }
//     // })
// }
//
// export default {
//     collectArgs
// }