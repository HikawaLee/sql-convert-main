// 校验枚举, 直接在配置文件中使用减少硬编码
export default {
    //region 规则类型
    //region 通用规则
    common: '通用',
    //endregion

    //region 数据库规则
    db: '数据库',
    //endregion

    //region 表规则
    table: '表',
    //endregion

    //region 字段规则
    field: '字段',
    //endregion

    //region 索引规则
    index: '索引',
    //endregion



    //region 数据类型
    dataType: '正则字符串',
    //endregion


    //region 数字正则
    numberRegex: /^[0-9]+$/,
    //endregion

    //region 字母正则, 不包含中文和空格
    alphaRegex: /^[^\u4e00-\u9fa5\s]+$/,
    //endregion

    //region 最大值
    max: '最大值',
    //endregion

    //region 最小值
    min: '最小值',
    //endregion

    //region 正则表达式
    regex: '正则表达式',
    //endregion

    // //region 规则名称
    // ruleName: '规则名称',
    // //endregion
    //
    // //region 规则描述
    // ruleDesc: '规则描述',
    // //endregion
    //
    // //region 规则内容
    // ruleContent: '规则内容',
    // //endregion
    //
    // //region 规则状态
    // ruleStatus: '规则状态',
    // //endregion
    //
    // //region 规则创建人
    // ruleCreator: '规则创建人',
    // //endregion
    //
    // //region 规则创建时间
    // ruleCreateTime: '规则创建时间',
    // //endregion
    //
    // //region 规则更新人
    // ruleUpdater: '规则更新人',
    // //endregion
    //
    // //region 规则更新时间
    // ruleUpdateTime: '规则更新时间',
    // //endregion
    //endregion
}