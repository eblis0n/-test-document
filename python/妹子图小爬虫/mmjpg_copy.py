# coding: utf-8

import requests
import os
import re, time
from parsel import Selector
import json, random

#图片存放的本地地址
MY_PATH = 'mmjpg_xiaoqingxin'
if not os.path.exists(MY_PATH):
    os.mkdir(MY_PATH)

#代理地址存入proxy_pool
with open('proxies_my.json', 'r') as f:
    proxy_pool = f.readlines()
proxies = json.loads(random.choice(proxy_pool))

#访问 小清新 的地址，准备获取第一页的图片链接
url = 'http://www.mmjpg.com/tag/xiaoqingxin'
originalHeaders = {
    'Host':'www.mmjpg.com',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'Referer': 'http://www.mmjpg.com/',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests':'1'
}
r = requests.get(url, headers=originalHeaders)
sel = Selector(text = r.text)
target = sel.xpath('//a[@target="_blank"]/@href')
detailURL = target.re(r'http://www.mmjpg.com/mm/\d+')
detailURL = list(set(detailURL))

pattern = re.compile(r'http://img.mmjpg.com/\d+/\d+/')
secondHeaders = {
    'Host':'img.mmjpg.com',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:56.0) Gecko/20100101 Firefox/56.0',
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'Referer': '',
    #'Connection': 'keep-alive',
    'Pragma':'no-cache',
    'Cache-Control':'no-cache'
}
for url in detailURL：
    #获取形如 http://www.mmjpg.com/mm/1065 其套图数量
    #tURL 为分离出的http://img.mmjpg.com/2017/1065/ 
    r = requests.get(url, headers = originalHeaders)
    if r.status_code != 200:
        print('访问失败', r.request.url, r.request.headers)
        r.raise_for_status()
    sel = Selector(text = r.text)
    total = sel.xpath('//div[@class = "page"]/a/@href').extract()[-2]
    total = int(total.split('/')[-1])
    src = sel.xpath('//div[@class = "content"]/a/img/@src').extract()
    src = ''.join(src)
    tURL = pattern.match(src).group(0)
    for i in range(1, total + 1):
        print('试图访问',url ,i)
        #ttURL 为获取的每一张图片的下载地址
        proxies = json.loads(random.choice(proxy_pool))
        ttURL = tURL + str(i) + '.jpg'
        secondHeaders['Referer'] = url + '/' + str(i)
        r = requests.get(ttURL, headers=secondHeaders, proxies=proxies)
        print(r.request.url)
        while r.status_code != 200:
            proxies = json.loads(random.choice(proxy_pool))
            r = requests.get(ttURL, headers=secondHeaders, proxies=proxies)
        with open(MY_PATH + '\\' + url.split('/')[-1] + '_' + str(i) + '.jpg', 'wb') as f:
            f.write(r.content)
        f.close()
       

