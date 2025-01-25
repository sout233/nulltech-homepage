import json
import sys
import os

try:
    # 读取JSON文件
    with open('src/tools/ntp3.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    # 检查数据结构是否正确
    if not data.get('data') or not isinstance(data['data'].get('staff'), list):
        raise ValueError("JSON文件格式不正确")
        
    # 提取成员信息
    staff_info = [
        {
            'name': member['name'],
            'face': member['face'],
            'mid': member['mid']
        }
        for member in data['data']['staff']
    ]
    
    # 创建output目录
    os.makedirs('output', exist_ok=True)
    
    # 写入输出文件
    output_path = 'output/ntp3.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(staff_info, f, ensure_ascii=False, indent=2)
    
    # 格式化输出
    print("╭───────────────────────────────╮")
    print("│          Staff Members        │")
    print("╰───────────────────────────────╯")
    for i, info in enumerate(staff_info, 1):
        print(f" {i:>2}. {info['name']}")
        print(f"    ├─ MID: {info['mid']}")
        print(f"    └─ Face: {info['face']}")
    print("\n共找到 {} 位成员".format(len(staff_info)))
    print(f"结果已保存到 {output_path}")
    
except FileNotFoundError:
    print("错误：找不到ntp2.json文件", file=sys.stderr)
    sys.exit(1)
except json.JSONDecodeError:
    print("错误：JSON文件格式不正确", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"错误：{str(e)}", file=sys.stderr)
    sys.exit(1)
