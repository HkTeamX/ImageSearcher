# ImageSearcher

一个用于图像搜索的多引擎库，支持多个流行的图像搜索引擎。

## 🚀支持情况

| 搜索引擎                             | url | path | 特殊选项                           |
| ------------------------------------ | --- | ---- | ---------------------------------- |
| [Ascii2d](https://ascii2d.net/)      | ✔   | ✔    | type, flaresolverr                 |
| [Iqdb](https://iqdb.org/)            | ✔   | ✔    | service, forcegray                 |
| [SauceNAO](https://saucenao.com)     | ✔   | ✔    | hide, dbs                          |
| [TraceMoe](https://trace.moe/)       | ✔   | ✔    | curBorders, anilistId, anilistInfo |
| [AnimeTrace](https://ai.animedb.cn/) | ✔   | ✔    | is_multi, ai_detect, model         |
| [TinEye](https://tineye.com/)        | ✔   | ✔    | -                                  |

## 📦安装

```sh
pnpm install image_searcher
```

## 🎉使用方法

### 基本用法

所有搜索器都支持两种输入方式：
- `path`: 本地图片文件路径
- `url`: 图片URL地址

```typescript
import { AnimeTrace, Ascii2d, Iqdb, SauceNAO, TinEye, TraceMoe } from 'image_searcher'

// 使用本地图片文件
const result1 = await SauceNAO({ path: './image.jpg' })

// 使用图片URL
const result2 = await Ascii2d({ url: 'https://example.com/image.jpg' })
```

### SauceNAO

SauceNAO 是一个强大的动漫图片搜索引擎。

```typescript
import { SauceNAO } from 'image_searcher'

// 基本搜索
const result = await SauceNAO({
  url: 'https://example.com/image.jpg'
})

// 高级选项
const result = await SauceNAO({
  path: './image.jpg',
  hide: 0, // 隐藏级别: 0-3
  dbs: [5, 21, 38] // 指定数据库ID
})
```

### Ascii2d

Ascii2d 是一个日本动漫图片搜索引擎。

```typescript
import { Ascii2d } from 'image_searcher'

// 基本搜索
const result = await Ascii2d({
  url: 'https://example.com/image.jpg'
})

// 使用FlareSolverr（用于绕过Cloudflare）
const result = await Ascii2d({
  url: 'https://example.com/image.jpg',
  type: 'bovw', // 搜索类型: 'color' 或 'bovw'
  flaresolverr: 'https://flaresolverr.example.com' // FlareSolverr API地址
})
```

### Iqdb

Iqdb 是一个多服务动漫图片搜索引擎。

```typescript
import { Iqdb, IqdbServicesPresets } from 'image_searcher'

// 基本搜索
const result = await Iqdb({
  url: 'https://example.com/image.jpg'
})

const result = await Iqdb({
  url: 'https://example.com/image.jpg',
  service: IqdbServicesPresets.anime // 使用动漫预设
})

// 自定义服务
const result = await Iqdb({
  url: 'https://example.com/image.jpg',
  service: [1, 2, 3, 4, 5, 6, 11, 13], // 指定服务ID
  forcegray: true // 强制灰度搜索
})
```

### TraceMoe

TraceMoe 是一个动漫视频截图搜索引擎。

```typescript
import { TraceMoe } from 'image_searcher'

// 基本搜索
const result = await TraceMoe({
  url: 'https://example.com/image.jpg'
})

// 高级选项
const result = await TraceMoe({
  path: './image.jpg',
  curBorders: true, // 裁剪边框
  anilistId: 12345, // 指定AniList ID
  anilistInfo: true // 返回AniList信息
})
```

### AnimeTrace

AnimeTrace 是一个AI动漫图片搜索引擎。

```typescript
import { AnimeTrace } from 'image_searcher'

// 基本搜索
const result = await AnimeTrace({
  url: 'https://example.com/image.jpg'
})

// 高级选项
const result = await AnimeTrace({
  path: './image.jpg',
  is_multi: 1, // 是否多结果: 0或1
  ai_detect: 1, // AI检测: 0或1
  model: 'model_name' // 指定模型
})
```

### TinEye

TinEye 是一个反向图片搜索引擎。

```typescript
import { TinEye } from 'image_searcher'

// 基本搜索
const result = await TinEye({
  url: 'https://example.com/image.jpg'
})
```

## 🔧FlareSolverr配置

某些搜索引擎（如Ascii2d）可能需要FlareSolverr来绕过Cloudflare保护。你需要先运行FlareSolverr服务：

```sh
# 使用Docker运行FlareSolverr
docker run -d -p 8191:8191 --name flaresolverr ghcr.io/flaresolverr/flaresolverr:latest
```

然后在搜索时提供FlareSolverr API地址：

```typescript
const result = await Ascii2d({
  url: 'https://example.com/image.jpg',
  flaresolverr: 'http://localhost:8191'
})
```

## 📝返回结果

每个搜索器返回的结果格式略有不同，但都包含以下基本信息：

- `image`: 图片URL
- `similarity`: 相似度（百分比）
- `sources`: 来源信息

具体返回类型请查看各搜索器的类型定义。

## 🔧类型导出

项目提供了完整的TypeScript类型定义，所有搜索器的类型都可以从主包中导入：

```typescript
import type {
  AnimeTraceOptions,
  AnimeTraceRes,
  Ascii2dOptions,
  Ascii2dRes,
  IqdbOptions,
  IqdbRes,
  SauceNAOOptions,
  SauceNAORes,
  TinEyeOptions,
  TinEyeRes,
  TraceMoeOptions,
  TraceMoeRes
} from 'image_searcher'
```

## 🧪测试

```sh
# 运行测试
pnpm test
```

## 🛠️开发

```sh
# 安装依赖
pnpm install

# 构建项目
pnpm build

# 类型检查
pnpm typecheck

# 代码检查
pnpm lint
```

## 📄许可证

MIT © huan_kong

## ⭐星星

[![Stargazers over time](https://starchart.cc/HkTeamX/ImageSearcher.svg)](https://starchart.cc/HkTeamX/ImageSearcher)
