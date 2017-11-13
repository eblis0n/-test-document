import requests, os
from parsel import Selector

#第一个headers用于访问主页
headers1 = {
    'Host':'www.mmjpg.com',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'Referer': 'http://www.mmjpg.com/',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests':'1',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
}
#第二个headers用于下载妹子图片
headers2 = {
    'Host':'img.mmjpg.com',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,en-US;q=0.7,en;q=0.3',
    'Accept-Encoding': 'gzip, deflate',
    'Referer': '',
    #'Connection': 'keep-alive',
    'Pragma':'no-cache',
    'Cache-Control':'no-cache'
}

#更换文件路径，创建保存妹子图片的文件夹
os.chdir(r"D:\\")
if not os.path.exists('meizitu'):
    os.mkdir('meizitu')
os.chdir(r"D:\\meizitu")

origin_url = 'http://www.mmjpg.com/home/'
#创建urls列表，保存主页中每个翻页的url
urls = []
for i in range(1, 74):
    url = origin_url + str(i)
    urls.append(url)

#变量index记录当前正在爬取的页面
index = 1
for url in urls:
    print("***********当前正在爬取主页下的第{}页***********".format(index))
    res = requests.get(url, headers=headers1)
    if res.status_code is not 200:
        print("url response not 200 error")
        res.raise_for_status()
    else:
        res.encoding = res.apparent_encoding
        sel = Selector(text=res.text)
        #获取当前页面下每个妹子的href链接和标题
        hrefs = sel.xpath('//div[@class="pic"]/ul/li/a/@href').extract()
        names = sel.xpath('//div[@class="pic"]/ul/li/span/a/text()').extract()

    for i in range(len(hrefs)):
        #循环爬取当前页面下的每一个妹子
        print("正在爬取第{}页下的第{}个妹子".format(index, i+1))
        if os.path.exists(names[i]):
            print("该妹子的图片已存在，继续爬取下一个")
            continue
        else:
            #创建以该妹子标题命名的文件夹用来保存该妹子的图片
            os.mkdir(names[i])
        res = requests.get(hrefs[i])
        if res.status_code is not 200:
            print('page response not 200 error')
            res.raise_for_status()
        else:
            sel = Selector(text=res.text)
            #获取妹子的图片张数pages以及图片的链接src
            pages = sel.xpath('//div[@class="page"]/a/text()').extract()
            src = sel.xpath('//div[@class="content"]/a/img/@src').extract_first()
        for page in range(1,int(pages[5])+1):
            #循环爬取每张图片
            #拼接每张图片的资源链接
            link = src[:-5] + str(page) + '.jpg'
            resp = requests.get(link, headers=headers2)
            if resp.status_code is not 200:
                print("link response not 200 error")
                resp.raise_for_status()
            else:
                content = resp.content
            path = names[i] + r'\\' + str(page) + '.jpg'
            #保存到本地
            with open(path, 'wb') as picfile:
                picfile.write(content)
    print("第{}页".format(index) + "已完成" + "  " + url)
    index = index + 1