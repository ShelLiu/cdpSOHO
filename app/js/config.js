/**
 * CDP Cloud Rebuilt
 * ===================
 * configurations
 * ===================
 * Author: Ash Zhang
 * Created: 2014/06/16
 * ===================
 * - lang (Language)
 */

var CDP_CONFIG = CDP_CONFIG || {};


/**
 * Language
 */

CDP_CONFIG.langType = 'zh';
CDP_CONFIG.lang = CDP_CONFIG.lang || {};

CDP_CONFIG.lang.en = {

  // Format
  dateYMD: 'YYYY-MM-DD',

  // Language
  SYS_EN_US: "American English",
  SYS_ZH_CN: "Simplified Chinese",
  SYS_JA_JP: "Japanese",

  // Date & Time
  weekSunS: 'S',
  weekMonS: 'M',
  weekTueS: 'T',
  weekWedS: 'W',
  weekThuS: 'Th',
  weekFriS: 'F',
  weekSatS: 'Sa',

  monthJanS: 'Jan',
  monthFebS: 'Feb',
  monthMarS: 'March',
  monthAprS: 'April',
  monthMayS: 'May',
  monthJunS: 'June',
  monthJulS: 'July',
  monthAugS: 'Aug',
  monthSepS: 'Sept',
  monthOctS: 'Oct',
  monthNovS: 'Nov',
  monthDecS: 'Dec',

  START_DATE: 'Start Date',
  END_DATE: 'End Date',
  START_TIME: 'Start Time',
  END_TIME: 'End Time',

  // Gender
  GENDER_MALE: 'Male',
  GENDER_FEMALE: 'Female',

  // Boolean
  YES: 'Yes',
  NO: 'No',

  // Button
  BTN_OK: 'Confirm',
  BTN_CANCEL: 'Cancel',
  BTN_REFRESH: 'Refresh',
  BTN_DELETE: 'Delete',
  BTN_ADD: 'Add',
  BTN_EDIT: 'Edit',
  BTN_SORT: 'Sort',
  BTN_FILTER: 'Filter',
  BTN_RESET: 'Reset',
  BTN_CLEAR: 'Clear',
  BTN_CLOSE: 'Close',
  BTN_APPLY: 'Apply',
  BTN_SYNC: 'Synchronize',
  BTN_ADD_SYNC:'Incremental synchronization',
  BTN_ALL_SYNC:'All synchronization',

  // Form
  UPLOAD_ATTACHMENT: 'Upload Attachment',

  // Filter conditions
  COND_SAME: 'Equal to',
  COND_NOT_SAME: 'Not Equal to',
  COND_LIKE: 'Contains',
  COND_NOT_LIKE: 'Does Not Contain',
  COND_NULL: 'Null',
  COND_NOT_NULL: 'Not Null',
  COND_EQUAL: 'Equal to',
  COND_NOT_EQUAL: 'Not Equal to',
  COND_LT: 'Less Than',
  COND_GT: 'Greater Than',
  COND_LTE: 'Less Than or Equal to',
  COND_GTE: 'Greater Than or Equal to',

  // Pager
  PAGER_NO: 'Page',
  PAGER_PAGE: ' ',
  PAGER_OF: 'of',

  // Sort
  SORT_SHOW_TITLE: 'Column Visibility & Order',
  SORT_PRIORITY_TITLE: 'Sort Priority',

  // Field Names
  FIELD_ID: 'ID',
  FIELD_NAME_CN: 'Name (CN)',
  FIELD_NAME_EN: 'Name',
  FIELD_GENDER: 'Gender',
  FIELD_DOB: 'DOB',
  FIELD_POSITION: 'Position',
  FIELD_DEPT: 'Position',
  FIELD_AGE: 'Age',
  FIELD_LEAVE_TYPE: 'Leave Type',
  FIELD_LEAVE_TIME: 'Leave Time',
  FIELD_REMARK: 'Remarks',

  // Menu
  SAP_FUNC_MGT: 'SAP Function Management',
  SAP_FUNC_NAME: 'Function Name',
  SAP_FUNC_RET_CUR_TYPE: "Return Curing Type",
  SAP_FUNC_RET_CUR_CACHE: "Cache",
  SAP_FUNC_RET_CUR_ENTITY: "Entity Table",
  SAP_FUNC_PORTAL_TABLE: "Portal Table Name",
  SAP_FUNC_ERROR_EXIST: 'SAP Function already exist!',

  SAP_PARAM_MGT: 'SAP Parameter Management',
  SAP_PARAM_CODE: 'Parameter Code',
  SAP_PARAM_TYPE: 'Parameter Type',
  SAP_PARAM_TYPE_INPUT: 'Input',
  SAP_PARAM_TYPE_OUTPUT: 'Output',
  SAP_PARAM_TYPE_ERROR: 'Error',
  SAP_PARAM_STYLE: 'Parameter Style',
  SAP_PARAM_STYLE_PARAM: 'JCO Param',
  SAP_PARAM_STYLE_STRUCT: 'JCO Structure',
  SAP_PARAM_STYLE_TABLE: 'JCO Table',
  SAP_PARAM_DETAIL: 'SAP Parameter Detail',
  SAP_PARAM_DETAIL_NAME: 'Parameter Name',
  SAP_PARAM_DETAIL_DESC: 'Parameter Description',
  SAP_PARAM_DETAIL_TYPE: 'Data Type',
  SAP_PARAM_DETAIL_TYPE_STRING: 'String',
  SAP_PARAM_DETAIL_TYPE_DATE: 'Date',
  SAP_PARAM_DETAIL_TYPE_INT: 'Integer',
  SAP_PARAM_DETAIL_TYPE_FLOAT: 'Float',
  SAP_PARAM_DETAIL_TYPE_DECIMAL: 'BigDecimal',
  SAP_PARAM_DETAIL_LENGTH: 'Data Length',
  SAP_PARAM_DETAIL_DEFAULT: 'Default Value',
  SAP_PARAM_DETAIL_MAP: 'Mapping sql',
  SAP_PARAM_DETAIL_LOCAL: 'Portal Field Name',
  SAP_PARAM_DETAIL_ERROR_EXIST: 'Parameter name already exist!',

  SAP_FUNC_PARAM: 'SAP Function Related Parameters',
  SAP_FUNC_NAME_CN: 'Function Chinese Name',
  SAP_PARAM_NAME_CN: 'Parameter Chinese Name',
  SAP_FUNC_PARAM_ERROR_EXIST: "Function and Parameter's relation already exist!",

  SAP_APP_TYPE_MGT: 'Approval Type Management',
  SAP_APP_TYPE_CODE: 'Approval Type Portal Code',
  SAP_APP_TYPE_SAP_CODE: 'Approval Type SAP Code',
  SAP_APP_TYPE_PORTAL_TABLE: 'Portal Table Name',

  SAP_APP_GROUP_MGT: 'Approval Group Management',
  SAP_APP_TYPE_NAME: 'Approval Type',
  SAP_APP_GROUP_CODE: 'Approval Group Code',
  BTN_SYNC_APP_GROUP: 'Synchronize Approval Group',
  BTN_APP_FLOW_CODE: 'Flow Encode',
  BTN_APP_FLOW_CHART: 'Flow Configure',
  BTN_SYNC_APP_ROLE: 'Synchronize Approval Role',

  SAP_APP_NODE_CODE: 'Flow Encode',
  SAP_APP_ROLE_CODE: 'Approval Role Code',
  SAP_APP_ROLE_NAME: 'Approval Role Name',
  SAP_APP_NODE_REMARK: 'Remark',

  SAP_APP_FLOW_CHART: 'Flow Configure',

  SAP_APP_ROLE_MGT: 'Approval Role Management',

  SAP_OT_COMPE_MGT: 'Overtime Compensation Type Management',
  SAP_OT_COMPE_TYPE_CODE: 'Overtime Compensation Type Code',

  ESS_LV_MGT: 'My Leave',
  ESS_EE_NO: 'Employee No.',
  ESS_EE_NAME: 'Employee Name',
  ESS_EE_DEPT: 'Department',
  ESS_LV_SUBTYPE_CODE: 'Leave Type Code',
  ESS_LV_SUBTYPE_NAME: 'Leave Type Name',
  ESS_APPLY_DATE: 'Application Date',
  ESS_APP_START_DATE: 'Start Date',
  ESS_APP_END_DATE: 'End Date',
  ESS_LV_HOURS: 'Leave Hours',
  ESS_APP_NOTE: 'Remark',
  ESS_APP_STATE: 'Status',
  ESS_ATTACHMENT_FLAG: 'Include Attachment',
  ESS_APP_ATTACHMENT: 'Attachment',

  //Role
  ROLE_MGT:'Authority Group Management',
  ROLE_SYS_SIP:'Customer Code',
  ROLE_SYS_CREATOR:'Creator',
  ROLE_SYS_CRTIME:'Create Time',
  ROLE_SYS_CHANGER:'Updater',
  ROLE_SYS_CHTIME:'Update Time',
  ROLE_SYS_START:'Start Time',
  ROLE_SYS_END:'End Time',
  ROLE_ROLE_NAME:'Authority Group Name',
  ROLE_ROLE_TYPE:'Authority Group Type',
  ROLE_SYSTEM_TYPE:'System Type',
  ROLE_UP_STATE:'State',
  ROLE_ROLE_DESCRIBE:'Describe',
  ROLE_ERROR_EXIST: 'Authority Group already exist!',

  // Employee
  EMP_INFO_MGT:'Employee Basic Info',
  PERSONNEL_NO:'SAP personnel numbers',
  CHINESE_NAME:'Chinese name',
  ENGLISH_NAME:'English_name',
  EMP_GENDER:'Gender',
  BIRTH_DATE:'Date of birth',
  BELONG_COMPANY:'Company',
  EMP_BELONG_DEPART:'Department',
  EMP_STATE_TEXT:'status',

  //systemResource
  SYSTEM_TYPE:'System Type',
  RESOURCE_CLASS:'Resource Class',
  RESOURCE_MODULE:'Resource Module',
  RESOURCE_URL:'Resource Url',
  DESCRIBE_EN_US:'Describe English',
  DESCRIBE_ZH_CN:'Describe Chinese',
  IS_MENU:'Menu',
  SYS_RESOURCE_MGT:'System Resource Management',
  HR:'HR',
  MSS:'MSS',
  ESS:'ESS',
  Widget:'Widget',
  Admin:'Admin',

  // Homepage [TEMP]
  LAUNCH_PAD: 'Launch Pad',
  TODO_LIST: 'Todo List',
  HR_BOARD: 'HR Board',
  MONTHLY_HEADCOUNT: 'Monthly Headcount',
  PERSONAL_MANAGEMENT: 'Personnel Management',
  CALENDAR: 'Calendar',
  ADD_WIDGET: 'Add Widget',
  SEARCH: 'Search',
  FOOTER: 'Copyright © 2013–2014 CDP Group Ltd. All rights reserved.',

  // Report [TEMP]
  REPORT_NAME_1: 'Employee Basic Info',
  REPORT_NAME_2:'Personal Basic Info',

  // Dialog [TEMP]
  DIALOG_HEADING_ADD: 'Add',
  DIALOG_HEADING_EDIT: 'Edit',

  // Menu [TEMP]
  JS_LIBRARY: 'JS Library',
  LEAVE_DEMO: 'Leave Demo',
  REPORT_DEMO: 'Report Demo',
  FORM_DEMO: 'Form Demo',
  EMP_INFO_DEMO: 'Employee Info Demo',
  LINK_DEMO: 'Linkage Demo',
  TREE_DEMO: 'Ash Tree Demo',

  // Linkage [TEMP]
  LINKAGE_LIST_TITLE: 'Linkage List',

  // Form [TEMP]
  FORM_FIELD_1: 'Field',
  FORM_ELEMENT_1_LABEL: 'Button',
  FORM_DEAD: 'Dead',

  // Global message
  MSG_SERVER_ERROR: 'System error! Please contact administrator!',
  MSG_NO_SELECT: 'Please select a piece of data first.',
  MSG_DELETE_PROMPT: 'Deleted data is irrecoverable. Sure to continue?',
  MSG_OPERATE_SUCCESS: 'Successful operation',
  VALIDATION_ERROR: 'Validation failed!',
  SAVE_SUCCESS: 'Save success!',
  SAVE_ERROR: 'Save failed!',
  OBJECT_PK_NOT_FOUND: 'Data Error!',

  //Shel only
  SHEL_TEST_PAGE: 'Test Page',
  CALENDAR_SOHO: 'CALENDAR SOHO'
};

CDP_CONFIG.lang.zh = {

  // Format
  dateYMD: 'YYYY-MM-DD',

  // Language
  SYS_EN_US: "美式英语",
  SYS_ZH_CN: "简体中文",
  SYS_JA_JP: "日语",

  // Date & Time
  weekSunS: '日',
  weekMonS: '一',
  weekTueS: '二',
  weekWedS: '三',
  weekThuS: '四',
  weekFriS: '五',
  weekSatS: '六',

  monthJanS: '一月',
  monthFebS: '二月',
  monthMarS: '三月',
  monthAprS: '四月',
  monthMayS: '五月',
  monthJunS: '六月',
  monthJulS: '七月',
  monthAugS: '八月',
  monthSepS: '九月',
  monthOctS: '十月',
  monthNovS: '十一月',
  monthDecS: '十二月',

  START_DATE: '开始日期',
  END_DATE: '结束日期',
  START_TIME: '开始时间',
  END_TIME: '结束时间',

  // Gender
  GENDER_MALE: '男',
  GENDER_FEMALE: '女',

  // Boolean
  YES: '是',
  NO: '否',

  // Button
  BTN_OK: '确定',
  BTN_CANCEL: '取消',
  BTN_REFRESH: '刷新',
  BTN_DELETE: '删除',
  BTN_ADD: '添加',
  BTN_EDIT: '编辑',
  BTN_SORT: '排序',
  BTN_FILTER: '筛选',
  BTN_RESET: '重置',
  BTN_CLEAR: '清空',
  BTN_CLOSE: '关闭',
  BTN_APPLY: '应用',
  BTN_SYNC: '同步',
  BTN_ADD_SYNC:'增量同步',
  BTN_ALL_SYNC:'全量同步',

  // Form
  UPLOAD_ATTACHMENT: '上传附件',

  // Filter conditions
  COND_SAME: '相同',
  COND_NOT_SAME: '不相同',
  COND_LIKE: '包含',
  COND_NOT_LIKE: '不包含',
  COND_NULL: '空',
  COND_NOT_NULL: '非空',
  COND_EQUAL: '等于',
  COND_NOT_EQUAL: '不等于',
  COND_LT: '小于',
  COND_GT: '大于',
  COND_LTE: '小于等于',
  COND_GTE: '大于等于',

  // Pager
  PAGER_NO: '第',
  PAGER_PAGE: '页',
  PAGER_OF: '条，共',

  // Sort
  SORT_SHOW_TITLE: '字段显示设置',
  SORT_PRIORITY_TITLE: '自定义排序',

  // Field Names
  FIELD_ID: '编号',
  FIELD_NAME_CN: '姓名',
  FIELD_NAME_EN: '英文名',
  FIELD_GENDER: '性别',
  FIELD_DOB: '出生日期',
  FIELD_POSITION: '职位',
  FIELD_DEPT: '部门',
  FIELD_AGE: '年龄',
  FIELD_LEAVE_TYPE: '请假类型',
  FIELD_LEAVE_TIME: '请假时间',
  FIELD_REMARK: '备注',

  // Menu
  SAP_FUNC_MGT: 'SAP 函数管理',
  SAP_FUNC_NAME: '函数名称',
  SAP_FUNC_RET_CUR_TYPE: "返回结果固化类型",
  SAP_FUNC_RET_CUR_CACHE: "缓存",
  SAP_FUNC_RET_CUR_ENTITY: "实体表",
  SAP_FUNC_PORTAL_TABLE: "Portal 端对应表名",
  SAP_FUNC_ERROR_EXIST: 'SAP 函数已存在',

  SAP_PARAM_MGT: 'SAP 参数管理',
  SAP_PARAM_CODE: '参数代码',
  SAP_PARAM_TYPE: '参数类型',
  SAP_PARAM_TYPE_INPUT: '输入',
  SAP_PARAM_TYPE_OUTPUT: '输出',
  SAP_PARAM_TYPE_ERROR: '错误',
  SAP_PARAM_STYLE: '参数格式',
  SAP_PARAM_STYLE_PARAM: 'JCO Param',
  SAP_PARAM_STYLE_STRUCT: 'JCO Structure',
  SAP_PARAM_STYLE_TABLE: 'JCO Table',
  SAP_PARAM_DETAIL: 'SAP 参数明细',
  SAP_PARAM_DETAIL_NAME: '参数名称',
  SAP_PARAM_DETAIL_DESC: '参数描述',
  SAP_PARAM_DETAIL_TYPE: '数据类型',
  SAP_PARAM_DETAIL_TYPE_STRING: '字符串',
  SAP_PARAM_DETAIL_TYPE_DATE: '日期',
  SAP_PARAM_DETAIL_TYPE_INT: '整数',
  SAP_PARAM_DETAIL_TYPE_FLOAT: '浮点数',
  SAP_PARAM_DETAIL_TYPE_DECIMAL: '高精度浮点数',
  SAP_PARAM_DETAIL_LENGTH: '数据长度',
  SAP_PARAM_DETAIL_DEFAULT: '默认值',
  SAP_PARAM_DETAIL_MAP: '映射脚本',
  SAP_PARAM_DETAIL_LOCAL: 'Portal 端对应字段',
  SAP_PARAM_DETAIL_ERROR_EXIST: '参数名称已存在！',

  SAP_FUNC_PARAM: 'SAP 函数关联参数',
  SAP_FUNC_NAME_CN: '函数简体中文',
  SAP_PARAM_NAME_CN: '参数简体中文',
  SAP_FUNC_PARAM_ERROR_EXIST: "函数与参数关系已存在！",

  SAP_APP_TYPE_MGT: '审批类型管理',
  SAP_APP_TYPE_CODE: '审批类型 Portal 编码',
  SAP_APP_TYPE_SAP_CODE: '审批类型 SAP 编码',
  SAP_APP_TYPE_PORTAL_TABLE: 'Portal 端对应表名',

  SAP_APP_GROUP_MGT: '审批组管理',
  SAP_APP_TYPE_NAME: '审批类型',
  SAP_APP_GROUP_CODE: '审批组编码',
  BTN_SYNC_APP_GROUP: '同步审批组',
  BTN_APP_FLOW_CODE: '流程编码',
  BTN_APP_FLOW_CHART: '流程配置',
  BTN_SYNC_APP_ROLE: '同步审批角色',

  SAP_APP_NODE_CODE: '流程编码',
  SAP_APP_ROLE_CODE: '审批角色代码',
  SAP_APP_ROLE_NAME: '审批角色名称',
  SAP_APP_NODE_REMARK: '备注',

  SAP_APP_FLOW_CHART: '流程配置',

  SAP_APP_ROLE_MGT: '审批角色管理',

  SAP_OT_COMPE_MGT: '加班补偿类型管理',
  SAP_OT_COMPE_TYPE_CODE: '加班补偿类型代码',

  ESS_LV_MGT: '我的休假',
  ESS_EE_NO: '员工工号',
  ESS_EE_NAME: '员工姓名',
  ESS_EE_DEPT: '部门名称',
  ESS_LV_SUBTYPE_CODE: '休假类型编码',
  ESS_LV_SUBTYPE_NAME: '休假类型名称',
  ESS_APPLY_DATE: '申请日期',
  ESS_APP_START_DATE: '开始时间',
  ESS_APP_END_DATE: '结束时间',
  ESS_LV_HOURS: '休假小时数',
  ESS_APP_NOTE: '备注',
  ESS_APP_STATE: '状态',
  ESS_ATTACHMENT_FLAG: '是否包含附件',
  ESS_APP_ATTACHMENT: '附件',

  //Role
  ROLE_MGT:'权限组管理',
  ROLE_SYS_SIP:'客户代码',
  ROLE_SYS_CREATOR:'记录创建者',
  ROLE_SYS_CRTIME:'记录创建时间',
  ROLE_SYS_CHANGER:'记录最后更改者',
  ROLE_SYS_CHTIME:'记录最后更改时间',
  ROLE_SYS_START:'记录生效时间',
  ROLE_SYS_END:'记录失效时间',
  ROLE_ROLE_NAME:'权限组名',
  ROLE_ROLE_TYPE:'权限组类型',
  ROLE_SYSTEM_TYPE:'系统类型',
  ROLE_UP_STATE:'可用状态',
  ROLE_ROLE_DESCRIBE:'角色描述',
  ROLE_ERROR_EXIST: '权限组已存在!',

  // Employee
  EMP_INFO_MGT:'员工基本信息',
  PERSONNEL_NO:'SAP人员号',
  CHINESE_NAME:'中文名',
  ENGLISH_NAME:'英文名',
  EMP_GENDER:'性别',
  BIRTH_DATE:'出生日期',
  BELONG_COMPANY:'公司',
  EMP_BELONG_DEPART:'部门',
  EMP_STATE_TEXT:'员工状态',

//systemResource
  SYSTEM_TYPE:'系统类型',
  RESOURCE_CLASS:'资源分类',
  RESOURCE_MODULE:'资源模块',
  RESOURCE_URL:'资源URL',
  DESCRIBE_EN_US:'资源描述英文',
  DESCRIBE_ZH_CN:'资源描述中文',
  IS_MENU:'是否快捷可用',
  SYS_RESOURCE_MGT:'系统资源管理',
  HR:'HR',
  MSS:'MSS',
  ESS:'ESS',
  Widget:'Widget',
  Admin:'Admin',

  // Homepage [TEMP]
  LAUNCH_PAD: '天空飞来五个字儿：内都不是事儿',
  TODO_LIST: '干啥呢',
  HR_BOARD: 'HR 叨逼叨',
  MONTHLY_HEADCOUNT: '每个月总有那么几个人',
  PERSONAL_MANAGEMENT: '管事儿大妈',
  CALENDAR: '岁月的痕迹',
  ADD_WIDGET: '又要加个小微件',
  SEARCH: '来，搜一个',
  FOOTER: 'Copyright © 2013–2014 CDP Group Ltd. 版权所有.',

  // Linkage [TEMP]
  LINKAGE_LIST_TITLE: '联动列表',

  // Form [TEMP]
  FORM_FIELD_1: '表单组',
  FORM_ELEMENT_1_LABEL: '按钮',
  FORM_DEAD: '此人已死',

  // Report [TEMP]
  REPORT_NAME_1: '员工基本信息报表',
  REPORT_NAME_2:'个人基本信息报表',

  // Dialog [TEMP]
  DIALOG_HEADING_ADD: '添加',
  DIALOG_HEADING_EDIT: '编辑',

  // Menu [TEMP]
  JS_LIBRARY: 'CDP JS 公用方法',
  LEAVE_DEMO: '请假测试',
  REPORT_DEMO: '报表测试',
  FORM_DEMO: '表单测试',
  EMP_INFO_DEMO: '员工信息测试',
  LINK_DEMO: '联动测试',
  TREE_DEMO: 'Ash Tree 测试',

  // Global message
  MSG_SERVER_ERROR: '系统错误，请联系管理员。',
  MSG_NO_SELECT: '请选择一条数据。',
  MSG_DELETE_PROMPT: '删除操作不可恢复。是否继续？',
  MSG_OPERATE_SUCCESS: '操作成功',
  VALIDATION_ERROR: '校验失败。',
  SAVE_SUCCESS: '保存成功！',
  SAVE_ERROR: '保存失败。',
  OBJECT_PK_NOT_FOUND: '数据错误。',

  //Shel only
  SHEL_TEST_PAGE: '测试页',
  CALENDAR_SOHO: 'SOHO 排班日历'
};

CDP_CONFIG.lang.jp = {

  // Format
  dateYMD: 'YYYY-MM-DD',

  // Language
  SYS_EN_US: "アメリカ英語",
  SYS_ZH_CN: "簡体字中国語",
  SYS_JA_JP: "日本語",

  // Date & Time
  weekSunS: '日',
  weekMonS: '月',
  weekTueS: '火',
  weekWedS: '水',
  weekThuS: '木',
  weekFriS: '金',
  weekSatS: '土',

  monthJanS: '一月',
  monthFebS: '二月',
  monthMarS: '三月',
  monthAprS: '四月',
  monthMayS: '五月',
  monthJunS: '六月',
  monthJulS: '七月',
  monthAugS: '八月',
  monthSepS: '九月',
  monthOctS: '十月',
  monthNovS: '十一月',
  monthDecS: '十二月',

  START_DATE: '開始日',
  END_DATE: '終了日',
  START_TIME: '開始時間',
  END_TIME: '終了時間',

  // Gender
  GENDER_MALE: '男',
  GENDER_FEMALE: '女',

  // Boolean
  YES: 'はい',
  NO: 'いいえ',

  // Button
  BTN_OK: 'よーし',
  BTN_CANCEL: 'ヤメ',
  BTN_REFRESH: 'リフレッシュ',
  BTN_DELETE: '削除',
  BTN_ADD: '追加',
  BTN_EDIT: 'エディット',
  BTN_SORT: 'ソート',
  BTN_FILTER: 'フィルター',
  BTN_RESET: 'リセット',
  BTN_CLEAR: 'クリアー',
  BTN_CLOSE: 'クローズ',
  BTN_APPLY: 'アプライ',
  BTN_SYNC: 'シンクロナス',
  BTN_ADD_SYNC:'増分同期',
  BTN_ALL_SYNC:'同期の全額',

  // Form
  UPLOAD_ATTACHMENT: '添付ファイルをアップロード',

  // Filter conditions
  COND_SAME: 'と同じ',
  COND_NOT_SAME: '同じではなぃ',
  COND_LIKE: '含む',
  COND_NOT_LIKE: '含まれていなぃ',
  COND_NULL: '空',
  COND_NOT_NULL: '非空',
  COND_EQUAL: '等しい',
  COND_NOT_EQUAL: '等しくない',
  COND_LT: '未満',
  COND_GT: '超える',
  COND_LTE: '以下',
  COND_GTE: '以上',

  // Pager
  PAGER_NO: 'ページ',
  PAGER_PAGE: ' ',
  PAGER_OF: 'of',

  // Sort
  SORT_SHOW_TITLE: 'フィールドの表示設定',
  SORT_PRIORITY_TITLE: 'カスタム並べ替え',

  // Field Names
  FIELD_ID: '番号',
  FIELD_NAME_CN: '名前',
  FIELD_NAME_EN: '名前（英）',
  FIELD_GENDER: 'ジェンダー',
  FIELD_DOB: '生年月日',
  FIELD_POSITION: 'ポスト',
  FIELD_DEPT: '部門',
  FIELD_AGE: '年代',
  FIELD_LEAVE_TYPE: '休暇タイプ',
  FIELD_LEAVE_TIME: '请假時間',
  FIELD_REMARK: '発言',

  // Menu
  SAP_FUNC_MGT: 'SAP 機能管理',
  SAP_FUNC_NAME: '機能名',
  SAP_FUNC_RET_CUR_TYPE:"リターン結果硬化タイプ",
  SAP_FUNC_RET_CUR_CACHE:"キャッシュ",
  SAP_FUNC_RET_CUR_ENTITY:"エンティティテーブル" ,
  SAP_FUNC_PORTAL_TABLE:"Portal テーブル名",
  SAP_FUNC_ERROR_EXIST: 'SAP 機能が既に存在してい',

  SAP_PARAM_MGT: 'SAP パラメータ管理',
  SAP_PARAM_CODE: 'パラメータコード',
  SAP_PARAM_TYPE: 'パラメーターの型',
  SAP_PARAM_TYPE_INPUT: '入力する',
  SAP_PARAM_TYPE_OUTPUT: '輸出',
  SAP_PARAM_TYPE_ERROR: 'エラー',
  SAP_PARAM_STYLE: 'パラメータ形式',
  SAP_PARAM_STYLE_PARAM: 'JCO Param',
  SAP_PARAM_STYLE_STRUCT: 'JCO Structure',
  SAP_PARAM_STYLE_TABLE: 'JCO Table',
  SAP_PARAM_DETAIL: 'SAP パラメータ詳細',
  SAP_PARAM_DETAIL_NAME: 'パラメーター名',
  SAP_PARAM_DETAIL_DESC: 'パラメーター記述',
  SAP_PARAM_DETAIL_TYPE: 'データの種類',
  SAP_PARAM_DETAIL_TYPE_STRING: '文字列',
  SAP_PARAM_DETAIL_TYPE_DATE: '日付',
  SAP_PARAM_DETAIL_TYPE_INT: '整数',
  SAP_PARAM_DETAIL_TYPE_FLOAT: 'フロート',
  SAP_PARAM_DETAIL_TYPE_DECIMAL: '単精度浮動小数点',
  SAP_PARAM_DETAIL_LENGTH: 'データ長',
  SAP_PARAM_DETAIL_DEFAULT: 'デフォルト値',
  SAP_PARAM_DETAIL_MAP: 'マッピングスクリプト',
  SAP_PARAM_DETAIL_LOCAL: 'Portal 対応するフィールド',
  SAP_PARAM_DETAIL_ERROR_EXIST: 'パラメータ名はすでに存在しています!',

  SAP_FUNC_PARAM: 'SAP 機能に関連するパラメータ',
  SAP_FUNC_NAME_CN: '機能簡体字中国語',
  SAP_PARAM_NAME_CN: 'パラメータ簡体字中国語',
  SAP_FUNC_PARAM_ERROR_EXIST: "機能とパラメータの関係が既に存在している！",

  SAP_APP_TYPE_MGT: '承認タイプマネージャ',
  SAP_APP_TYPE_CODE: 'Portal 符号化型式承認',
  SAP_APP_TYPE_SAP_CODE: 'SAP 符号化型式承認',
  SAP_APP_TYPE_PORTAL_TABLE: 'Portal テーブル名',

  SAP_APP_GROUP_MGT: '承認グループの管理',
  SAP_APP_TYPE_NAME: '型式承認',
  SAP_APP_GROUP_CODE: '承認グループのコーディング',
  BTN_SYNC_APP_GROUP: '同期承認グループ',
  BTN_APP_FLOW_CODE: 'プロセスコード',
  BTN_APP_FLOW_CHART: 'プロセス構成',
  BTN_SYNC_APP_ROLE: '同期の承認者の役割',

  SAP_APP_NODE_CODE: 'プロセスコード',
  SAP_APP_ROLE_CODE: '承認の役割コード',
  SAP_APP_ROLE_NAME: '承認ロール名',
  SAP_APP_NODE_REMARK: '発言',

  SAP_APP_FLOW_CHART: 'プロセス構成',

  SAP_APP_ROLE_MGT: '承認ロール管理',

  SAP_OT_COMPE_MGT: '残業補償型マネージャ',
  SAP_OT_COMPE_TYPE_CODE: '超過勤務手当の種類コード',

  ESS_LV_MGT: '私の休暇',
  ESS_EE_NO: 'スタッフなし',
  ESS_EE_NAME: '従業員名',
  ESS_EE_DEPT: '部署名',
  ESS_LV_SUBTYPE_CODE: 'タイプコードを残す',
  ESS_LV_SUBTYPE_NAME: '休暇型名',
  ESS_APPLY_DATE: '出願日',
  ESS_APP_START_DATE: '開始時刻',
  ESS_APP_END_DATE: '終了時間',
  ESS_LV_HOURS: '休暇時間',
  ESS_APP_NOTE: '発言',
  ESS_APP_STATE: 'ステータス',
  ESS_ATTACHMENT_FLAG: '添付ファイルを',
  ESS_APP_ATTACHMENT: 'アタッチメント',

  //Role
  ROLE_MGT:'権限グループ管理',
  ROLE_SYS_SIP:'顧客コード',
  ROLE_SYS_CREATOR:'作成者',
  ROLE_SYS_CRTIME:'作成時刻',
  ROLE_SYS_CHANGER:'変更者',
  ROLE_SYS_CHTIME:'変更時刻',
  ROLE_SYS_START:'有効時刻',
  ROLE_SYS_END:'失効時刻',
  ROLE_ROLE_NAME:'権限グループ名',
  ROLE_ROLE_TYPE:'権限グループタイプ',
  ROLE_SYSTEM_TYPE:'システムタイプ',
  ROLE_UP_STATE:'有効状態',
  ROLE_ROLE_DESCRIBE:'役割説明',
  ROLE_ERROR_EXIST: '権限グループが既に存在します',

  // Employee
  EMP_INFO_MGT:'従業員情報',
  PERSONNEL_NO:'SAPの担当者番号',
  CHINESE_NAME:'中国名',
  ENGLISH_NAME:'英語名',
  EMP_GENDER:'セックス',
  BIRTH_DATE:'生年月日',
  BELONG_COMPANY:'会社',
  EMP_BELONG_DEPART:'部門',
  EMP_STATE_TEXT:'ステータス',

  //systemResource
  SYSTEM_TYPE:'システムタイプ',
  RESOURCE_CLASS:'資源分類',
  RESOURCE_MODULE:'リソースモジュール',
  RESOURCE_URL:'リソースURL',
  DESCRIBE_EN_US:'英語のリソース記述',
  DESCRIBE_ZH_CN:'リソース説明中国',
  IS_MENU:'子ノードが存在する',
  SYS_RESOURCE_MGT:'システムリソースマネージャ',
  HR:'HR',
  MSS:'MSS',
  ESS:'ESS',
  Widget:'Widget',
  Admin:'Admin',

  // Homepage [TEMP]
  LAUNCH_PAD: 'ローンチ·パッド',
  TODO_LIST: 'メモ',
  HR_BOARD: 'HR ボード',
  MONTHLY_HEADCOUNT: '毎月の人員',
  PERSONAL_MANAGEMENT: '人材マネジメント',
  CALENDAR: 'カレンダー',
  ADD_WIDGET: 'ウィジェット追加',
  SEARCH: '検索',
  FOOTER: 'Copyright © 2013–2014 CDP Group Ltd. 無断複写·転載を禁じます.',

  // Linkage [TEMP]
  LINKAGE_LIST_TITLE: '联动列表',

  // Form [TEMP]
  FORM_FIELD_1: 'Field',
  FORM_ELEMENT_1_LABEL: 'ボタン',
  FORM_DEAD: '死',

  // Report [TEMP]
  REPORT_NAME_1: '従業員情報',
  REPORT_NAME_2:'基本的な個人情報',

  // Dialog [TEMP]
  DIALOG_HEADING_ADD: '追加',
  DIALOG_HEADING_EDIT: 'エディット',

  // Menu [TEMP]
  JS_LIBRARY: 'JS ライブラリー',
  LEAVE_DEMO: '休暇デモ',
  REPORT_DEMO: 'レポートデモ',
  FORM_DEMO: 'フォームデモ',
  EMP_INFO_DEMO: '従業員情報デモ',
  LINK_DEMO: 'リンケージデモ',
  TREE_DEMO: 'Ash Tree デモ',

  // Global message
  MSG_SERVER_ERROR: 'システム·エラー！管理者に連絡してください！',
  MSG_NO_SELECT: 'データを選択してください。',
  MSG_DELETE_PROMPT: '削除操作は元に戻すことはできません。継続するかどうか？',
  MSG_OPERATE_SUCCESS: '成功した操作',
  VALIDATION_ERROR: 'チェックが失敗した!',
  SAVE_SUCCESS: '正常に保存!',
  SAVE_ERROR: '保存に失敗しました!',
  OBJECT_PK_NOT_FOUND: 'データエラー!',

  //Shel only
  SHEL_TEST_PAGE: 'テストページ',
  CALENDAR_SOHO: 'カレンダー'
};

// ----- Language end ----- //
