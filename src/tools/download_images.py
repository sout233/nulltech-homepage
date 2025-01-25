import os
import requests
from urllib.parse import urlparse
import json

# 配置
IMAGE_DIR = os.path.join(os.path.dirname(__file__), '../../public/images')
PROFILES_FILE = os.path.join(os.path.dirname(__file__), '../models/profiles.js')

def download_image(url, filename):
    """下载图片并保存到本地"""
    try:
        # 添加User-Agent头
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://www.bilibili.com/'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # 确保目录存在
        os.makedirs(os.path.dirname(filename), exist_ok=True)
        
        with open(filename, 'wb') as f:
            f.write(response.content)
        return True
    except Exception as e:
        print(f"下载失败: {url} - {str(e)}")
        return False

def extract_image_urls():
    """从ntp1.json, ntp2.json, ntp3.json中提取所有图片URL"""
    urls = set()
    json_files = [
        os.path.join(os.path.dirname(__file__), 'ntp1.json'),
        os.path.join(os.path.dirname(__file__), 'ntp2.json'),
        os.path.join(os.path.dirname(__file__), 'ntp3.json')
    ]
    
    for json_file in json_files:
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            # 提取封面图片
            if 'data' in data and 'pic' in data['data']:
                urls.add(data['data']['pic'])
                
            # 提取staff头像
            if 'data' in data and 'staff' in data['data']:
                for staff in data['data']['staff']:
                    if 'face' in staff:
                        urls.add(staff['face'])
                        
        except Exception as e:
            print(f"读取 {json_file} 失败: {str(e)}")
            
    return list(urls)

def update_profiles():
    """更新profiles.js中的图片路径为本地路径"""
    try:
        with open(PROFILES_FILE, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 替换所有face字段为本地路径
        new_content = []
        for line in content.split('\n'):
            if '"face":' in line:
                url = line.split('"face":')[1].split(',')[0].strip().strip('"')
                filename = os.path.basename(urlparse(url).path)
                local_path = f'"/images/{filename}"'
                line = line.replace(url, local_path)
            new_content.append(line)
        
        # 确保目录存在
        os.makedirs(os.path.dirname(PROFILES_FILE), exist_ok=True)
        
        # 写入新内容
        with open(PROFILES_FILE, 'w', encoding='utf-8', newline='\n') as f:
            f.write('\n'.join(new_content))
        print(f"成功更新: {PROFILES_FILE}")
        return True
    except Exception as e:
        print(f"更新失败: {str(e)}")
        return False

def main():
    # 创建图片目录
    os.makedirs(IMAGE_DIR, exist_ok=True)
    
    # 下载所有图片
    urls = extract_image_urls()
    print(f"共发现{len(urls)}张图片")
    for url in urls:
        filename = os.path.basename(urlparse(url).path)
        save_path = os.path.join(IMAGE_DIR, filename)
        if not os.path.exists(save_path):
            print(f"正在下载: {url}")
            if download_image(url, save_path):
                print(f"保存到: {save_path}")
            else:
                print(f"跳过: {url}")
        else:
            print(f"已存在: {save_path}")
    
    # 更新profiles.js
    update_profiles()
    print("profiles.js已更新为本地路径")

if __name__ == '__main__':
    main()
