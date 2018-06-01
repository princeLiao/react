import city from './city';
// 婚姻状况（1未婚、2已婚、3离异、4其他）
exports.wedState = [
    [
        {
            label: '未婚',
            value: '1'
        },
        {
            label: '已婚',
            value: '2'
        },
        {
            label: '离异',
            value: '3'
        },
        {
            label: '其他',
            value: '4'
        }
    ]
];
// 政治面貌（1中共党员、2共青团员、3群众、4其他）
exports.politicalStatus = [
    [
        {
            label: '中共党员',
            value: '1'
        },
        {
            label: '共青团员',
            value: '2'
        },
        {
            label: '群众',
            value: '3'
        },
        {
            label: '其他',
            value: '4'
        }
    ]
];

exports.nexus = [
    [
        {
            label: '父母',
            value: '父母'
        },
        {
            label: '子女',
            value: '子女'
        },
        {
            label: '配偶',
            value: '配偶'
        }
    ]
]

exports.relation = [
    [
        {
            label: '同事',
            value: '同事'
        },
        {
            label: '朋友',
            value: '朋友'
        },
        {
            label: '其他',
            value: '其他'
        }
    ]
]
exports.gender = [
    [
        {
            label: "男",
            value: '0'
        },
        {
            label: "女",
            value: '1'
        }
    ]
]

/**
 * 学历（1小学、2初中、3高中(中专)、4大专(高职)、5本科、6硕士研究生、7博士研究生）
 */
exports.educationLevel = [
    [
        {
            label: '小学',
            value: '1'
        },
        {
            label: '初中',
            value: '2'
        },
        {
            label: '高中(中专)',
            value: '3'
        },
        {
            label: '大专(高职)',
            value: '4'
        },
        {
            label: '本科',
            value: '5'
        },
        {
            label: '硕士研究生',
            value: '6'
        },
        {
            label: '博士研究生',
            value: '7'
        }

    ]
]
// 学位（0无、 1学士、2硕士、3博士）
exports.degree = [
    [
        {
            label: '无',
            value: '0'
        },
        {
            label: '学士',
            value: '1'
        },
        {
            label: '硕士',
            value: '2'
        },
        {
            label: '博士',
            value: '3'
        }

    ]
]
 // 外语语种（1英语、2日语、3德语、4法语、5韩语、6俄语）
exports.languageType = [
    [
        {
            label: '英语',
            value: '1'
        },
        {
            label: '日语',
            value: '2'
        },
        {
            label: '德语',
            value: '3'
        },
        {
            label: '法语',
            value: '4'
        },
        {
            label: '韩语',
            value: '5'
        },   {
            label: '俄语',
            value: '6'
        }

    ]
]
 // 外语熟练程度（1一般、2良好、3精通）
exports.languageLevel = [
    [
        {
            label: '一般',
            value: '1'
        },
        {
            label: '良好',
            value: '2'
        },
        {
            label: '精通',
            value: '3'
        }

    ]
]
/**
 * 地区枚举值
 */
exports.district = city;

