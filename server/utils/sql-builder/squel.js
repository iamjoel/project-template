// https://hiddentao.com/squel/api.html
var squel = require("squel")
var squelMysql = squel.useFlavour('mysql')

var sql = squelMysql.select()
    .from("table")
    .toString()
print('query', sql)

var sql = squelMysql.select()
    .from("table")
    .fields(['a', 'b', 'c'])
    .toString()
print('query with fields', sql)

sql = squelMysql.select()
        .from('table1')
        .where('a = "b"')
        .where(
            squelMysql.expr()
                .and('c = "d"')
                .or('e = "f"')

        )
        .where('age > 18')
        .toString()
print('where', sql)

sql = squelMysql.select()
        .from('table1')
        .where('a = ? and c = ?', 'd', 4)
        .where('b = ?', squelMysql.select().field('score').from('results').where('c = 5'))
        .toString()
print('where use params', sql)


sql = splitQuery(squelMysql.select()
        .from('table1'), {
            'e': 'd',
            'c': 'b',
        })
        .limit(4)
        .toString()
print('where use obj', sql, true)

function splitQuery(sql, obj) {
    var keys = Object.keys(obj)
    keys.forEach(key => {
        sql = sql.where(`${key} = "${obj[key]}"`)
    })
    return sql
}

sql = squelMysql.select()
        .from('table1')
        .fields('id', 'name')
        .order('name', true) // ASC
        .order('name2', false) // DESC
        .toString()
print('order', sql)

sql = squelMysql.select()
    .from("table1", 't1')
    .left_join("table2", 't2', 't1.id = t2.sth')
    .field('field1')
    .field('t1.name')
    .field('t2.age')
    .toString()
print('table join', sql)

sql = squelMysql.select()
        .from('table1')
        .limit(10)
        .offset(2)
        .toString()
print('paging', sql)

sql = squelMysql.insert()
        .into("students")
        .set("name", "Fred")
        .set("age", 29)
        .toString()
print('insert', sql)

sql = squelMysql.insert()
        .into("students")
        .setFields({
            name: 'Joel',
            age: 18
        })
        .toString()
print('insert use obj', sql)

sql = squelMysql.update()
        .table("students")
        .set("name", "Fred")
        .set("age", 29)
        .where('id = 3')
        .toString()
print('update', sql)

sql = squelMysql.update()
        .table("students")
        .setFields({
            name: 'Joel',
            age: 18
        })
        .where('id = 3')
        .toString()
print('update use obj', sql)


sql = squelMysql.delete()
        .from("students")
        .where('id = 3')
        .toString()
print('delete', sql)

function print(describe, sql, isPrint) {
    console.log(`${describe}: ${sql}`)
}