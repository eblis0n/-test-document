import requests
import re
from pymongo import MongoClient

url_1 = 'http://www.mmjpg.com/'
headers = {
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.90 Safari/537.36'
}

r = requests.get(url_1,headers=headers)
r.encoding = 'utf-8'

#正则表达式
rr = re.compile(r'class="info">(.*?)<')
da = rr.findall(r.text)
a=da[0][1]+da[0][2]

#连接数据库 mongodb
client = MongoClient()
db = client.mmjpg_database
collection = db.mmjpg_collection
mmjpg = db.mmjpg

# 获取数据
for i in range(int(a)):
    url_2 = 'http://www.mmjpg.com/home/' + str(i + 1)
    r = requests.get(url_2, headers=headers)
    r.encoding = 'utf-8'
    # 正则表达式
    rr = re.compile(r'src="(.*?)".*?alt="(.*?)".*?<span class="view">(.*?)<')
    data = rr.findall(r.text)
    # 存储数据
    tt = []
    for m in data:
        t = {
            'url': m[0],
            'title': m[1],
            'view': m[2],
        }
        tt.append(t)
    mmjpg.insert_many(tt)
    print('成功存入'+str(i+1)+'系列')
