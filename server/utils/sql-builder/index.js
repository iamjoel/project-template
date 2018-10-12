// 更多 https://github.com/dresende/node-sql-query/tree/master/test/integration
var sqlBuilder = require('sql-query')
sqlQuery = sqlBuilder.Query('mysql')

var sqlSelect = sqlQuery.select()
var sql = sqlSelect
            .from('table1')
            .build()
print('simple query', sql)

sql = sqlQuery.select()
        .from('table1')
        .select('id', 'name')
        .select('sth')
        .select('sth2')
        .as('other')
        .build()
print('query with filed', sql)

sql = sqlQuery.select()
        .from('table1')
        .select('id', 'name')
        .order('name', 'A') // ASC
        .order('name2', 'Z') // DESC
        .build()
print('order', sql)

sql = sqlQuery.select()
        .from('table1')
        .where({
          col: 1,
          col2: 2
        })
        .where({
          col3: sqlBuilder.like('ccc')
        })
        .where({
          or: [{'col4': 4}, {'col5': 5}]
        })
        .build()
print('where', sql)


sql = sqlQuery.select()
        .from('table1')
        .from('table2', 'table2Col', 'table1Col')
        .from('table3', 'id2', 'id1', { joinType: 'left inner' })
        .where('table1', { col: 1 }, 'table2', { col: 2 })
        .build()
print('table join', sql)

function print(describe, sql) {
  console.log(`${describe}: ${sql}`)
}