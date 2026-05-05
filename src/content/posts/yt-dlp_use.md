---
title: yt-dlp常用下载命令
published: 2026-05-05
description: "记录yt-dlp的常用命令"
tags: ["yt-dlp", "shell", "ffmpeg", "command"]
author: Akeboshi Himari
draft: false
---

# 使用前的环境检查

## Archlinux

```bash
sudo pacman -S yt-dlp ffmpeg deno
```

## Windows

```powershell
scoop install yt-dlp
```

或手动下载`yt-dlp.exe`，然后把它和`ffmpeg.exe/ffprobe.exe`所在目录加入PATH

`ffmpeg`很重要，因为很多网站的视频和音频是分开的，yt-dlp下载后要靠ffmpeg自动合并。

# 最常用的下载命令

## 直接下载最高质量

`yt-dlp "视频链接"`

> 默认下载最佳视频+最佳音频合并 `bestvideo*+bestaudio/best`

## 查看可选清晰度 / 格式

`yt-dlp -F "视频链接"`

## 指定 1080p 以内

`yt-dlp -f "bv*[height<=1080]+ba/b[height<=1080]" "视频链接"`

## 指定 720p 以内

`yt-dlp -f "bv*[height<=720]+ba/b[height<=720]" "视频链接"`

## 只下载音频

`yt-dlp -x --audio-format mp3 "视频链接"`

保存为 `m4a`:

`yt-dlp -x --audio-format m4a "视频链接"`

## 指定输出文件名

`yt-dlp -o "%(title)s.%(ext)s" "视频链接"`

更推荐这样，避免同名冲突：

`yt-dlp -o "%(uploader)s/%(upload_date)s-%(title)s-%(id)s.%(ext)s" "视频链接"`

# 🐭 Bilibili 视频下载

> ✅ 支持大多数公开视频（包括番剧、电影等）
>
> 🚫 暂不支持大会员付费内容

## 🎥 下载B站视频

```powershell
yt-dlp "https://www.bilibili.com/video/BVxxxxxxx"
```

### 🎞️ 下载分P视频

> B站的 BV 视频如果有分 P，yt-dlp 很多时候会把它当成 playlist 处理。官方选项里 --yes-playlist 表示下载列表，--no-playlist 表示只下当前视频；-I/--playlist-items 可以指定列表中的第几个或范围。

#### 只下第1P和第3P

```powershell
yt-dlp --playlist-items 1 "https://www.bilibili.com/video/BV1xxxxxxx"
yt-dlp -I 3 "https://www.bilibili.com/video/BVxxxx"
```

#### 下载整个分P / 合集

```powershell
yt-dlp --yes-playlist "https://www.bilibili.com/video/BVxxxx"
```

### 只下载当前这个视频，不展开列表

```powershell
yt-dlp --no-playlist "https://www.bilibili.com/video/BVxxxx"
```

### 下载第 1 到第 5 个

```powershell
yt-dlp -I 1:5 "https://www.bilibili.com/video/BVxxxx"
```

### 隔一个下一个，比如 1、3、5、7

yt-dlp -I 1::2 "<https://www.bilibili.com/video/BVxxxx>"

### 保存到合集文件夹，并按序号命名

```powershell
yt-dlp --yes-playlist \
  -o "%(playlist_title)s/%(playlist_index)03d - %(title)s.%(ext)s" \
  "https://www.bilibili.com/video/BVxxxx"
```

# 📺 YouTube 视频下载

## 普通下载

```powershell
yt-dlp "https://www.youtube.com/watch?v=xxxx"
```

## 下载播放列表

```powershell
yt-dlp "https://www.youtube.com/playlist?list=xxxx"
```

## 只下载播放列表前 10 个

```powershell
yt-dlp -I 1:10 "播放列表链接"
```

# 🐦 Twitter 视频下载

> ✅ 支持公开视频和GIF（私密/限制访问的可能无法下载）

## 🎥 下载推文中的视频

```powershell
yt-dlp "https://twitter.com/用户名/status/1234567890123456789"
yt-dlp "https://x.com/用户名/status/数字"
```

## 如果提示需要登录、403、无法解析，就加 cookies

```powershell
yt-dlp -f best "https://twitter.com/用户名/status/1234567890123456789"
```

## 保存文件名推荐

```powershell
yt-dlp \
  --cookies-from-browser firefox \
  -o "Twitter/%(uploader)s-%(id)s-%(title).80s.%(ext)s" \
  "推文链接"
```

# 使用`-F(--list-formats)`和`-f(--format)`选项列出视频所有可下载格式(搭配cookies下载网站最高画质视频和音频)

## 1. **查看可用格式**

```shell
yt-dlp -F --cookies /path/to/your/cookies "https://www.bilibili.com/video/BVxxxxxx"
```

执行这个命令后会看到一个列表，记住`ID`和对应的视频的`RESOLUTION`

## 1. **指定格式并下载**:（该加cookies的加cookies）

### - **只下载视频**

```shell
yt-dlp -f <视频ID> "https://www.bilibili.com/video/BVxxxxxx"
# 假如1080p视频id为600
yt-dlp -f 600 "https://www.bilibili.com/video/BVxxxxxx"
```

### - **只下载音频**

```shell
yt-dlp -f <音频ID> "https://www.bilibili.com/video/BVxxxxxx"
# 假如最高音质的音频id为125
yt-dlp -f 125 "https://www.bilibili.com/video/BVxxxxxx"
```

### - **同时下载视频和音频**

```shell
yt-dlp -f 600+125 "https://www.bilibili.com/video/BVxxxxxx"
```

### - **下载最佳视频和最佳音频**

```shell
yt-dlp -f bestvideo+bestaudio "https://www.bilibili.com/video/BVxxxxxx"
yt-dlp -f bv+ba "https://www.bilibili.com/video/BVxxxxxx"
```

# 使用 -o 避免重名覆盖 和 下载列表 / 合集时按顺序保存

## 1. 防止重名覆盖 / 混乱

有些视频标题一样，或者标题里有奇怪字符，加上 id 更稳：

`yt-dlp -o "%(title)s-%(id)s.%(ext)s" "URL"`

输出类似：

`我的视频标题-dQw4w9WgXcQ.mp4`

## 2. 下载列表 / 合集时按顺序保存

```powershell
yt-dlp --yes-playlist \
  -o "%(playlist_title)s/%(playlist_index)03d - %(title)s.%(ext)s" \
  "合集链接"
```

输出会变成：

```powershell
某个合集/
├── 001 - 第一集.mp4
├── 002 - 第二集.mp4
├── 003 - 第三集.mp4
```

> 如果不用 playlist_index，文件管理器里可能按标题排序，顺序乱掉。

## 3. 自动分类到不同文件夹

比如按 UP 主 / 频道分类：

```powershell
yt-dlp -o "%(uploader)s/%(title)s.%(ext)s" "URL"
```

输出：

```powershell
某个UP主/
└── 视频标题.mp4
```

或者按日期分类：

```powershell
yt-dlp -o "%(uploader)s/%(upload_date)s-%(title)s.%(ext)s" "URL"
```

输出：

```powershell
某个UP主/
└── 20260505-视频标题.mp4
```

## 常见字段含义

|                    |                               |
| :----------------: | :---------------------------: |
|     %(title)s      |           视频标题            |
|       %(id)s       |            视频 ID            |
|      %(ext)s       |          文件扩展名           |
|    %(uploader)s    |        UP 主 / 频道名         |
|  %(upload_date)s   | 上传日期，格式通常是 20260505 |
| %(playlist_title)s |      播放列表 / 合集标题      |
| %(playlist_index)s |         播放列表序号          |

> %(ext)s 一般必须保留，因为最终扩展名可能是 mp4、webm、mkv、m4a 等。
