# -*- coding: utf-8 -*-
import requests
import os
import sys
from parsel import Selector

def get_html(url,head):
    max_num = 0
    while True:
        try:
            r = requests.get(url,headers=head,timeout=5)
            r.raise_for_status()
            r.encoding = r.apparent_encoding
            return r.text
        except:
            max_num += 1
            print('try again...(%d)' % max_num)
            if max_num > 3:
                print('Request failed')
                return 'Error(0)'

def saveimg(root,name,img):
    path = root + name
    try:
        if not os.path.exists(root):
            os.makedirs(root)
        if not os.path.exists(path):
            with open(path,'wb') as f:
                f.write(img)
                f.close()
                print('Save successfully')
        else:
            print('Image already exists')
    except:
        print('Save failed')

if __name__ == '__main__':

    while True:
        driveletter = input('Please enter the symbol of destination disk(A~Z):')
        if driveletter.isalpha() and len(driveletter)==1:
            break

    home_url = 'http://www.mmjpg.com'
    home_head = {
        'user-agent':'Mozilla/5.0'
    }
    '''
    temp = requests.head(home_url,headers=home_head)
    if not os.path.exists(driveletter+':\\mm\\'):
        os.makedirs(driveletter+':\\mm\\')
    if not os.path.exists(driveletter+':\\mm\\'+'date.txt'):
        with open(driveletter+':\\mm\\'+'date.txt','w') as f:
            f.write(temp.headers['Date'])
            f.close()
    else:
        with open(driveletter+':\\mm\\'+'date.txt','r+') as f:
            f.seek(0,0)
            lasttime = f.readline()
            latesttime = temp.headers['Date']
            if lasttime == latesttime:
                f.close()
                print('Update completed')
                sys.exit(0)
            else:
                f.seek(0,0)
                f.write(latesttime)
                f.close()
    '''
    home = get_html(home_url,home_head)
    s0 = Selector(home)
    home_totalpage = s0.xpath('//em[@class="info"]/text()').extract()[0][1:-1]

    crawlpage=['1','1']
    while True:
        crawlpage[0] = input('Total page:%s\nStart page(1~%s):' % (home_totalpage,home_totalpage))
        if crawlpage[0].isnumeric() and 1<=int(crawlpage[0])<=73:
            break
    while True:
        crawlpage[1] = input('End page(%s~%s):' % (crawlpage[0],home_totalpage))
        if crawlpage[1].isnumeric() and int(crawlpage[0])<=int(crawlpage[1])<=73:
            break

    for page in range(int(crawlpage[1])-int(crawlpage[0])+1):
        home_url = 'http://www.mmjpg.com/home/'+str(page+1)
        home = get_html(home_url,home_head)
        s0 = Selector(home)
        album_title = s0.xpath('//span[@class="title"]/a/text()').extract()
        album_addr = s0.xpath('//span[@class="title"]/a/@href').extract()
        for i in range(len(album_addr)):
            album_head = home_head.copy()
            album = get_html(album_addr[i],album_head)
            s1 = Selector(album)
            album_totalpage = s1.xpath('//div[@class="page"]/a/text()').extract()[-2]
            temp = s1.xpath('//div[@class="content"]/a/img/@src').extract()[0].split('/')
            temp_url = temp[0]+'/'+temp[1]+'/'+temp[2]+'/'+temp[3]+'/'+temp[4]+'/'
            root = driveletter+'://mm//'+album_title[i]+'//'
            for img_name in range(int(album_totalpage)):
                if os.path.exists(root+str(img_name+1)+'.jpg'):
                    continue
                img_url = temp_url+str(img_name+1)+'.jpg'
                img_head = album_head.copy()
                img_head['Referer'] = album_addr[i]+'/'+str(img_name+1)
                img = requests.get(img_url,headers=img_head)
                saveimg(root,str(img_name+1)+'.jpg',img.content)
    print('Done!')
    input('Press \'Enter\' to continue...')