import sqlite3 from 'sqlite3'
// 读取某个key的余额
// 扣除某个key的余额，并返回最新余额

export async function update_balance(inputKey: string, dbPath: string): Promise<number | string> {
  const db = new sqlite3.Database(dbPath)

  interface RecordType {
    key: string
    value: number
  }

  const query = 'SELECT * FROM users WHERE key = ?'
  const params = [inputKey]

  const rows = await new Promise<RecordType[]>((resolve, reject) => {
    db.all<RecordType>(query, params, (err, rows) => {
      if (err)
        reject(err)

      else
        resolve(rows)
    })
  })

  if (rows.length === 0)
    return '没有找到您的Key，请检查是否写错了，如果没有 请联系管理员~'

  const record = rows[0]
  const value = record.value - 1

  const update = 'UPDATE users SET value = ? WHERE key = ?'
  const params2 = [value, inputKey]

  await new Promise<void>((resolve, reject) => {
    db.run(update, params2, (err) => {
      if (err)
        reject(err)

      else
        resolve()
    })
  })

  db.close()

  return value
}

export async function refresh_balance(inputKey: string, dbPath: string) {
  try {
    await update_balance(inputKey, dbPath)
  }
  catch (err) {
    console.error(err)
  }
}
