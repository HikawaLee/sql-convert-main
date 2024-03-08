
const standardize = (layoutState, componentKey) => {

    console.log(`开始标准化数据：${new Date().toLocaleTimeString()}, 
    当前组件为: ${layoutState.type}, 要赋值的ID为: ${componentKey},
    当前组件的布局状态为: ${JSON.stringify(layoutState)}`);
    switch (layoutState.type) {
    case "input":
                return {
                    ...layoutState,
                    id: componentKey,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                }
            case "radio":
                return {
                    ...layoutState,
                    id: componentKey,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                    options: layoutState.options,
                }

            case "checkbox":
                return {
                    ...layoutState,
                    id: componentKey,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                    options: layoutState.options,
                }

            case "select":
                return {
                    ...layoutState,
                    id: componentKey,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                    options: layoutState.options,
                }
            case "textarea":
                return {
                    ...layoutState,
                    id: componentKey,
                    type: "textarea",
                    label: layoutState.title,
                }

                case "toggle":
                return {
                    ...layoutState,
                    label: layoutState.title,
                    id: componentKey,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                    options: layoutState.options,
                }

            default:
                return {
                    type: "input",
                    title: layoutState.title,
                    id: componentKey,
                    defaultValue: layoutState.defaultValue,
                    rules: layoutState.rules,
                    convertor: layoutState.convertor,
                }
    }
}

export default standardize;