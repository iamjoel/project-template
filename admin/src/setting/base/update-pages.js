export default [
	{
		"id": "a90ab542-36db-f7af-bf03-fff6d6899c35",
		"basic": {
			"entity": "singer",
			"isCommon": true
		},
		"cols": [
			{
				"label": "歌手",
				"key": "name",
				"dataType": "string",
				"validRules": [
					{
						"name": "required",
						"errMsg": "请输入歌手名称"
					}
				],
				"formatFn": null,
				"saveFormatFn": null
			}
		],
		"fn": [],
		"isFreeze": 0
	},
	{
		"id": "dede6489-5952-0225-859b-f8eb9779a5b7",
		"basic": {
			"entity": "song",
			"codePath": "music/song"
		},
		"cols": [
			{
				"label": "名称",
				"key": "name",
				"dataType": "string",
				"validRules": [
					{
						"name": "required",
						"errMsg": "请输入名称"
					}
				],
				"formatFn": null,
				"saveFormatFn": null
			},
			{
				"label": "歌曲类型",
				"key": "type",
				"dataType": "select",
				"dataSource": {
					"type": "dict",
					"key": "musicType"
				},
				"validRules": [
					{
						"name": "required",
						"errMsg": "请选择歌曲类型"
					}
				],
				"formatFn": null,
				"saveFormatFn": null
			},
			{
				"label": "歌手",
				"key": "singerId",
				"dataType": "select",
				"dataSource": {
					"type": "entity",
					"key": "singer"
				},
				"validRules": [
					{
						"name": "required",
						"errMsg": "请选择歌手"
					}
				],
				"formatFn": null,
				"saveFormatFn": null
			},
			{
				"label": "创作时间",
				"key": "date",
				"dataType": "date",
				"validRules": [],
				"formatFn": null,
				"saveFormatFn": null
			},
			{
				"label": "图片",
				"key": "img",
				"dataType": "img",
				"imgConfig": {
					"max": 5,
					"tip": "建议尺寸 750 * 300",
					"size": "200"
				},
				"validRules": [],
				"formatFn": null,
				"saveFormatFn": null
			},
			{
				"label": "多图测试",
				"key": "imgs",
				"dataType": "imgs",
				"imgConfig": {
					"max": 5,
					"tip": "建议尺寸 750 * 300",
					"size": "150"
				},
				"validRules": [],
				"formatFn": null,
				"saveFormatFn": null
			},
			{
				"label": "排序值",
				"key": "sort",
				"dataType": "number",
				"validRules": [
					{
						"name": "required",
						"errMsg": "请输入排序值"
					}
				],
				"formatFn": null,
				"saveFormatFn": null
			}
		],
		"fn": [],
		"isFreeze": 0
	}
]