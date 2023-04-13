import sqlite3
import secrets
import datetime

today = datetime.date.today().strftime('%Y_%m_%d')
# 连接数据库
conn = sqlite3.connect('/Users/mac/Downloads/chatgpt-web-main/service/mysql/users')

# 创建表，如果不存在
cursor = conn.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                    key TEXT PRIMARY KEY,
                    balance INTEGER
                )''')

def generate_key(balance):
    """生成唯一的密钥"""
    while True:
        key = secrets.token_hex(4) + '_' + str(today) + '_' + str(balance) + '_' + secrets.token_hex(4)
        try:
            cursor.execute('INSERT INTO users (key, balance) VALUES (?,?)', (key, balance))
            # 插入成功则返回密钥
            return key
        except sqlite3.IntegrityError:
            print('error')
            # 如果插入失败，表示密钥已经存在，需要重新生成
            continue

# 从命令行读取用户输入的数字
balance = int((input("请输入数字：")))

# 生成唯一的密钥
key = generate_key(balance)

# 输出生成的密钥
print(f"生成的密钥为：{key}")

# 关闭连接
conn.commit()
conn.close()
