
const standardize = (layoutState, componentKey) => {
    if(componentKey === '') componentKey = Math.random().toString(36).substring(7);
    console.log("componentKey", componentKey);
    console.log('----------')
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