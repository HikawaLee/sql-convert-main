/**
 * 标准化表单组件的配置, 用于传递给LayoutStore统一处理
 * 主要是为每个组件配置添加了唯一id, 设置一些必填配置的默认值,防止用户配置不全导致无法运行
 * @param componentState 某个组件的配置信息
 * @param componentKey 组件的key
 */
const standardize = (componentState, componentKey) => {
    if (componentKey === '') componentKey = Math.random().toString(36).substring(7);
    const { title, ...rest } = componentState; // 解构赋值，排除title属性
    switch (componentState.type) {
        case "input":
            return {
                ...rest,
                id: componentKey,
                label: componentState.title,
                //若布局配置中为配置desc, 则默认为空字符串
                desc: componentState.desc || "",
                placeholder: componentState.placeholder || "",
            }

        case "checkbox":
            return {
                ...rest,
                id: componentKey,
                label: componentState.title,
                desc: componentState.desc || "",
                placeholder: componentState.placeholder || "",
                options: componentState.options,
            }

        case "select":
            return {
                ...rest,
                id: componentKey,
                label: componentState.title,
                desc: componentState.desc || "",
                placeholder: componentState.placeholder || "",
                options: componentState.options,
            }

        case "toggle":
            return {
                ...rest,
                label: componentState.title,
                id: componentKey,
                desc: componentState.desc || "",
                placeholder: componentState.placeholder || "",
                options: componentState.options,
            }

        // case "textarea":
        //     return {
        //         ...rest,
        //         id: componentKey,
        //         type: "textarea",
        //         label: componentState.title,
        //     }


        // case "radio":
        //     return {
        //         ...rest,
        //         id: componentKey,
        //         label: componentState.title,
        //         desc: componentState.desc || "",
        //         placeholder:  componentState.placeholder || "",
        //         options: componentState.options,
        //     }

        default:
            return {
                type: "input",
                label: componentState.title,
                id: componentKey,
                defaultValue: componentState.defaultValue,
                rules: componentState.rules,
                convertor: componentState.convertor,
            }
    }
}

export default standardize;