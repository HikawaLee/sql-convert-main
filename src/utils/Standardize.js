
const standardize = (layoutState) => {
    switch (layoutState.type) {
    case "input":
                return {
                    ...layoutState,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                }
            case "radio":
                return {
                    ...layoutState,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                    options: layoutState.options,
                }

            case "checkbox":
                return {
                    ...layoutState,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                    options: layoutState.options,
                }

            case "select":
                return {
                    ...layoutState,
                    label: layoutState.title,
                    desc: layoutState.desc || "",
                    placeholder:  layoutState.placeholder || "",
                    options: layoutState.options,
                }
            case "textarea":
                return {
                    ...layoutState,
                    type: "textarea",
                    label: layoutState.title,
                }
            default:
                return {
                    type: "input",
                    title: layoutState.title,
                    defaultValue: layoutState.defaultValue,
                    rules: layoutState.rules,
                    convertor: layoutState.convertor,
                }
    }
}

export default standardize;