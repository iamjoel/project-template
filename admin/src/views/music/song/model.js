var model = [
  {
    "key": "name",
    "dataType": "string"
  },
  {
    "key": "type",
    "dataType": "select",
    "dataSource": {
      "type": "dict",
      "key": "musicType"
    }
  },
  {
    "key": "singerId",
    "dataType": "select",
    "dataSource": {
      "type": "entity",
      "key": "singer"
    }
  },
  {
    "key": "date",
    "dataType": "date"
  },
  {
    "key": "img",
    "dataType": "img"
  },
  {
    "key": "imgs",
    "dataType": "imgs"
  },
  {
    "key": "sort",
    "dataType": "number"
  }
]

export default model
