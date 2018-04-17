export default [
	{
		"id": "0178437f-5ee7-36cd-bcb3-53711324adeb",
		"basic": {
			"entity": "singer",
			"isUpdatePageCommon": true,
			"codePath": "music/singer",
			"isCommon": true
		},
		"cols": [
			{
				"label": "名称",
				"key": "name",
				"formatFn": null
			}
		],
		"operate": {
			"add": {
				"isShow": true
			},
			"edit": {
				"isShow": true
			},
			"detail": {
				"isShow": true
			},
			"delete": {
				"isShow": true
			}
		},
		"searchCondition": [
			{
				"label": "名称",
				"key": "name",
				"dataType": "string",
				"dataSource": {
					"type": "",
					"key": ""
				}
			}
		],
		"fn": [],
		"isFreeze": 0
	},
	{
		"id": "d780556b-c50f-f699-01e8-ee44dee29e42",
		"basic": {
			"entity": "song",
			"isUpdatePageCommon": false,
			"isCommon": false,
			"codePath": "music/song"
		},
		"cols": [
			{
				"label": "歌曲名称",
				"key": "name",
				"formatFn": null
			},
			{
				"label": "歌手",
				"key": "singer.name",
				"formatFn": null
			},
			{
				"label": "类型",
				"key": "type",
				"formatFn": "formatType"
			}
		],
		"operate": {
			"add": {
				"isShow": true
			},
			"edit": {
				"isShow": true
			},
			"detail": {
				"isShow": true
			},
			"delete": {
				"isShow": true
			}
		},
		"searchCondition": [
			{
				"label": "歌名",
				"key": "name",
				"dataType": "string",
				"dataSource": {
					"type": "",
					"key": ""
				}
			},
			{
				"label": "歌曲类型",
				"key": "type",
				"dataType": "select",
				"dataSource": {
					"type": "dict",
					"key": "musicType"
				}
			}
		],
		"fn": [
			{
				"name": "formatType",
				"args": [
					"row"
				],
				"body": "return this.getDictName('musicType', row.type)"
			},
			{
				"name": "doSth",
				"args": [
					"row"
				],
				"body": "return row.singer.name + row.name"
			}
		],
		"isFreeze": 0
	}
]