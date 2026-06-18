<h3 align="center">
  <a name="readme-top"></a>
  <img
    src="https://raw.githubusercontent.com/firecrawl/firecrawl/main/img/firecrawl_logo.png"
    height="200"
  >
</h3>

<div align="center">
  <a href="https://github.com/firecrawl/firecrawl/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/firecrawl/firecrawl" alt="License">
  </a>
  <a href="https://pepy.tech/project/firecrawl-py">
    <img src="https://static.pepy.tech/badge/firecrawl-py" alt="Downloads">
  </a>
  <a href="https://GitHub.com/firecrawl/firecrawl/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/firecrawl/firecrawl.svg" alt="GitHub Contributors">
  </a>
  <a href="https://firecrawl.dev">
    <img src="https://img.shields.io/badge/Visit-firecrawl.dev-orange" alt="Visit firecrawl.dev">
  </a>
</div>

<div>
  <p align="center">
    <a href="https://twitter.com/firecrawl">
      <img src="https://img.shields.io/badge/Follow%20on%20X-000000?style=for-the-badge&logo=x&logoColor=white" alt="Follow on X" />
    </a>
    <a href="https://www.linkedin.com/company/104100957">
      <img src="https://img.shields.io/badge/Follow%20on%20LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Follow on LinkedIn" />
    </a>
    <a href="https://discord.gg/firecrawl">
      <img src="https://img.shields.io/badge/Join%20our%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Join our Discord" />
    </a>
  </p>
</div>

---

# **🔥 Firecrawl**

**大规模搜索、抓取和交互网页的 API。🔥** 这是一款网络上下文 API，可用于查找来源、提取内容，并将其转换为干净的 Markdown 或结构化数据，供你的智能体使用。开源，并提供[托管服务](https://firecrawl.dev/?ref=github)。

_Pst. 嘿，你，来给我们的项目点个星吧 :)_

<a href="https://github.com/firecrawl/firecrawl">
  <img src="https://img.shields.io/github/stars/firecrawl/firecrawl.svg?style=social&label=Star&maxAge=2592000" alt="GitHub stars">
</a>

---

## 为什么选择 Firecrawl？

- **行业领先的可靠性**：覆盖 96% 的网页，包括重度 JS 渲染的页面 —— 无需代理烦恼，直接获取干净数据（[查看基准测试](https://www.firecrawl.dev/blog/the-worlds-best-web-data-api-v25)）
- **极速响应**：数百万页面的 P95 延迟仅为 3.4 秒，专为实时智能体和动态应用打造
- **LLM 友好输出**：干净的 Markdown、结构化 JSON、截图等 —— 更少的 Token 消耗，更好的 AI 应用体验
- **我们处理繁琐事务**：自动轮换代理、编排、速率限制、JS 拦截内容等 —— 零配置
- **智能体就绪**：一条命令即可将 Firecrawl 连接到任何 AI 智能体或 MCP 客户端
- **媒体解析**：解析并提取网络上托管的 PDF、DOCX 等文件内容
- **交互操作**：在提取内容前，点击、滚动、输入、等待和按键
- **开源**：透明且协作开发 —— [加入我们的社区](https://github.com/firecrawl/firecrawl)

---

## 功能概览

**核心端点**

| 功能 | 描述 |
|---------|-------------|
| [**搜索 (Search)**](#search) | 搜索网页并获取搜索结果的完整页面内容 |
| [**抓取 (Scrape)**](#scrape) | 将任意 URL 转换为 Markdown、HTML、截图或结构化 JSON |
| [**交互 (Interact)**](#interact) | 抓取页面后，使用 AI 提示词或代码与其交互 |

**更多功能**

| 功能 | 描述 |
|---------|-------------|
| [**智能体 (Agent)**](#agent) | 自动化数据收集，只需描述你的需求 |
| [**爬取 (Crawl)**](#crawl) | 一个请求即可抓取网站的所有 URL |
| [**映射 (Map)**](#map) | 即时发现网站上的所有 URL |
| [**批量抓取 (Batch Scrape)**](#batch-scrape) | 异步抓取数千个 URL |

---

## 快速开始

在 [firecrawl.dev](https://firecrawl.dev) 注册以获取 API 密钥。前往 [playground](https://firecrawl.dev/playground) 进行测试。

### 搜索 (Search)

搜索网页并获取搜索结果的完整内容。

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

search_result = app.search("firecrawl", limit=5)
```

<details>
<summary><b>Node.js / cURL / CLI</b></summary>

**Node.js**
```javascript
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});

app.search("firecrawl", { limit: 5 })
```

**cURL**
```bash
curl -X POST 'https://api.firecrawl.dev/v2/search' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  "query": "firecrawl",
  "limit": 5
}'
```

**CLI**
```bash
firecrawl search "firecrawl" --limit 5
```
</details>

输出：
```json
[
  {
    "url": "https://firecrawl.dev",
    "title": "Firecrawl",
    "markdown": "Turn websites into..."
  },
  {
    "url": "https://docs.firecrawl.dev",
    "title": "Firecrawl Docs",
    "markdown": "# Getting Started..."
  }
]
```

### 抓取 (Scrape)

从任意网站获取 LLM 就绪数据 —— Markdown、JSON、截图等。

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

result = app.scrape('firecrawl.dev')
```

<details>
<summary><b>Node.js / cURL / CLI</b></summary>

**Node.js**
```javascript
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({ apiKey: "fc-YOUR_API_KEY" });

app.scrape('firecrawl.dev')
```

**cURL**
```bash
curl -X POST 'https://api.firecrawl.dev/v2/scrape' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{
  "url": "firecrawl.dev"
}'
```

**CLI**
```bash
firecrawl scrape https://firecrawl.dev
firecrawl https://firecrawl.dev --only-main-content
```
</details>

输出：
```
# Firecrawl

Firecrawl 帮助 AI 系统搜索、抓取和交互网页。

## 功能
- 搜索：在全网查找信息
- 抓取：从任意页面获取干净数据
- 交互：点击、导航和操作页面
- 智能体：自主数据收集
```

### 交互 (Interact)

抓取页面后，使用 AI 提示词或代码与其交互。

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

result = app.scrape("https://amazon.com")
scrape_id = result.metadata.scrape_id

app.interact(scrape_id, prompt="Search for 'mechanical keyboard'")
app.interact(scrape_id, prompt="Click the first result")
```

<details>
<summary><b>Node.js / cURL / CLI</b></summary>

**Node.js**
```javascript
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});

const result = await app.scrape("https://amazon.com");

await app.interact(result.metadata.scrapeId, {
  prompt: "Search for 'mechanical keyboard'"
});
await app.interact(result.metadata.scrapeId, {
  prompt: "Click the first result"
});
```

**cURL**
```bash
# 1. 抓取页面
curl -X POST 'https://api.firecrawl.dev/v2/scrape' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{"url": "https://amazon.com"}'

# 2. 与页面交互（使用第 1 步返回的 scrapeId）
curl -X POST 'https://api.firecrawl.dev/v2/scrape/SCRAPE_ID/interact' \
-H 'Authorization: Bearer fc-YOUR_API_KEY' \
-H 'Content-Type: application/json' \
-d '{"prompt": "Search for mechanical keyboard"}'
```

**CLI**
```bash
firecrawl scrape https://amazon.com
firecrawl interact exec --prompt "Search for 'mechanical keyboard'"
firecrawl interact exec --prompt "Click the first result"
```
</details>

输出：
```json
{
  "success": true,
  "output": "Keyboard available at $100",
  "liveViewUrl": "https://liveview.firecrawl.dev/..."
}
```

---

## 为你的智能体赋能

几分钟内即可将 Firecrawl 连接到任何 AI 智能体或 MCP 客户端。

### Skill（技能）

一条命令即可让你的智能体轻松访问实时网页数据。

```bash
npx -y firecrawl-cli@latest init --all --browser
```

安装后重启你的智能体。支持 [Claude Code](https://claude.ai/code)、[Antigravity](https://antigravity.google)、[OpenCode](https://opencode.ai) 等。

### MCP

几秒钟内将任何兼容 MCP 的客户端连接到网页。

```json
{
  "mcpServers": {
    "firecrawl-mcp": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-YOUR_API_KEY"
      }
    }
  }
}
```

### 智能体入门

你是 AI 智能体吗？获取此 Skill，为你的用户注册、获取 API 密钥，并开始使用 Firecrawl 构建应用。

```bash
curl -s https://firecrawl.dev/agent-onboarding/SKILL.md
```

查看 [Skill + CLI 文档](https://docs.firecrawl.dev/sdks/cli)了解所有可用命令。关于 MCP，请参阅 [firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server)。

---

## 更多端点

### 智能体 (Agent)

**从网页获取数据的最简单方式。** 描述你的需求，我们的 AI 智能体就会搜索、导航并检索数据。无需提供 URL。

Agent 是我们 `/extract` 端点的升级版：更快、更可靠，且无需提前知道 URL。

```bash
curl -X POST 'https://api.firecrawl.dev/v2/agent' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "prompt": "Find the pricing plans for Notion"
  }'
```

响应：
```json
{
  "success": true,
  "data": {
    "result": "Notion offers the following pricing plans:\n\n1. Free - $0/month...\n2. Plus - $10/seat/month...\n3. Business - $18/seat/month...",
    "sources": ["https://www.notion.so/pricing"]
  }
}
```

#### 结构化输出的智能体

使用 schema 获取结构化数据：

```python
from firecrawl import Firecrawl
from pydantic import BaseModel, Field
from typing import List, Optional

app = Firecrawl(api_key="fc-YOUR_API_KEY")

class Founder(BaseModel):
    name: str = Field(description="Full name of the founder")
    role: Optional[str] = Field(None, description="Role or position")

class FoundersSchema(BaseModel):
    founders: List[Founder] = Field(description="List of founders")

result = app.agent(
    prompt="Find the founders of Firecrawl",
    schema=FoundersSchema
)

print(result.data)
```

```json
{
  "founders": [
    {"name": "Eric Ciarla", "role": "Co-founder"},
    {"name": "Nicolas Camara", "role": "Co-founder"},
    {"name": "Caleb Peffer", "role": "Co-founder"}
  ]
}
```

#### 带 URL 的智能体（可选）

让智能体专注于特定页面：

```python
result = app.agent(
    urls=["https://docs.firecrawl.dev", "https://firecrawl.dev/pricing"],
    prompt="Compare the features and pricing information"
)
```

#### 模型选择

根据需求选择两种模型：

| 模型 | 成本 | 适用场景 |
|-------|------|----------|
| `spark-1-mini`（默认） | 便宜 60% | 大多数任务 |
| `spark-1-pro` | 标准价格 | 复杂研究、关键数据收集 |

```python
result = app.agent(
    prompt="Compare enterprise features across Firecrawl, Apify, and ScrapingBee",
    model="spark-1-pro"
)
```


**何时使用 Pro：**
- 跨多个网站比较数据
- 从导航复杂或需要认证的网站提取数据
- 智能体需要探索多条路径的研究任务
- 准确性至关重要的关键数据

在 [Agent 文档](https://docs.firecrawl.dev/features/agent)中了解更多关于 Spark 模型的信息。

### 爬取 (Crawl)

爬取整个网站并获取所有页面的内容。

```bash
curl -X POST 'https://api.firecrawl.dev/v2/crawl' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://docs.firecrawl.dev",
    "limit": 100,
    "scrapeOptions": {
      "formats": ["markdown"]
    }
  }'
```

返回一个任务 ID：
```json
{
  "success": true,
  "id": "123-456-789",
  "url": "https://api.firecrawl.dev/v2/crawl/123-456-789"
}
```

#### 检查爬取状态

```bash
curl -X GET 'https://api.firecrawl.dev/v2/crawl/123-456-789' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY'
```

```json
{
  "status": "completed",
  "total": 50,
  "completed": 50,
  "creditsUsed": 50,
  "data": [
    {
      "markdown": "# Page Title\n\nContent...",
      "metadata": {"title": "Page Title", "sourceURL": "https://..."}
    }
  ]
}
```

**注意：** [SDK](#sdks) 会自动处理轮询，提供更好的开发体验。

### 映射 (Map)

即时发现网站上的所有 URL。

```bash
curl -X POST 'https://api.firecrawl.dev/v2/map' \
  -H 'Authorization: Bearer fc-YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"url": "https://firecrawl.dev"}'
```

响应：
```json
{
  "success": true,
  "links": [
    {"url": "https://firecrawl.dev", "title": "Firecrawl", "description": "Turn websites into LLM-ready data"},
    {"url": "https://firecrawl.dev/pricing", "title": "Pricing", "description": "Firecrawl pricing plans"},
    {"url": "https://firecrawl.dev/blog", "title": "Blog", "description": "Firecrawl blog"}
  ]
}
```

#### 带搜索的映射

在网站内查找特定 URL：

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

result = app.map("https://firecrawl.dev", search="pricing")
# 返回按与 "pricing" 相关度排序的 URL
```

### 批量抓取 (Batch Scrape)

一次性抓取多个 URL：

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

job = app.batch_scrape([
    "https://firecrawl.dev",
    "https://docs.firecrawl.dev",
    "https://firecrawl.dev/pricing"
], formats=["markdown"])

for doc in job.data:
    print(doc.metadata.source_url)
```

---

## SDK

我们的 SDK 提供了一种便捷的方式来使用 Firecrawl 的所有功能，并自动处理异步操作的轮询。

### Python

安装 SDK：

```bash
pip install firecrawl-py
```

```python
from firecrawl import Firecrawl

app = Firecrawl(api_key="fc-YOUR_API_KEY")

# 抓取单个 URL
doc = app.scrape("https://firecrawl.dev", formats=["markdown"])
print(doc.markdown)

# 使用 Agent 进行自主数据收集
result = app.agent(prompt="Find the founders of Stripe")
print(result.data)

# 爬取网站（自动等待完成）
docs = app.crawl("https://docs.firecrawl.dev", limit=50)
for doc in docs.data:
    print(doc.metadata.source_url, doc.markdown[:100])

# 搜索网页
results = app.search("best AI data tools 2024", limit=10)
print(results)
```

### Node.js

安装 SDK：

```bash
npm install firecrawl
```

```javascript
import { Firecrawl } from 'firecrawl';

const app = new Firecrawl({ apiKey: 'fc-YOUR_API_KEY' });

// 抓取单个 URL
const doc = await app.scrape('https://firecrawl.dev', { formats: ['markdown'] });
console.log(doc.markdown);

// 使用 Agent 进行自主数据收集
const result = await app.agent({ prompt: 'Find the founders of Stripe' });
console.log(result.data);

// 爬取网站（自动等待完成）
const docs = await app.crawl('https://docs.firecrawl.dev', { limit: 50 });
docs.data.forEach(doc => {
    console.log(doc.metadata.sourceURL, doc.markdown.substring(0, 100));
});

// 搜索网页
const results = await app.search('best AI data tools 2024', { limit: 10 });
results.data.web.forEach(result => {
    console.log(`${result.title}: ${result.url}`);
});
```

### Java

添加依赖（[Gradle/Maven](https://docs.firecrawl.dev/sdks/java#installation)）：

```groovy
repositories {
    mavenCentral()
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.firecrawl:firecrawl-java-sdk:2.0'
}
```

```java
import dev.firecrawl.client.FirecrawlClient;
import dev.firecrawl.model.*;

FirecrawlClient client = new FirecrawlClient(
    System.getenv("FIRECRAWL_API_KEY"), null, null
);

// 抓取单个 URL
ScrapeParams scrapeParams = new ScrapeParams();
scrapeParams.setFormats(new String[]{"markdown"});
FirecrawlDocument doc = client.scrapeURL("https://firecrawl.dev", scrapeParams);
System.out.println(doc.getMarkdown());

// 使用 Agent 进行自主数据收集
AgentParams agentParams = new AgentParams("Find the founders of Stripe");
AgentResponse start = client.createAgent(agentParams);
AgentStatusResponse result = client.getAgentStatus(start.getId());
System.out.println(result.getData());

// 爬取网站（轮询直到完成）
CrawlParams crawlParams = new CrawlParams();
crawlParams.setLimit(50);
CrawlStatusResponse job = client.crawlURL("https://docs.firecrawl.dev", crawlParams, null, 10);
for (FirecrawlDocument page : job.getData()) {
    System.out.println(page.getMetadata().get("sourceURL"));
}

// 搜索网页
SearchParams searchParams = new SearchParams("best AI data tools 2024");
searchParams.setLimit(10);
SearchResponse results = client.search(searchParams);
for (SearchResult r : results.getResults()) {
    System.out.println(r.getTitle() + ": " + r.getUrl());
}
```

### Elixir

添加依赖：

```elixir
def deps do
  [
    {:firecrawl, "~> 1.0"}
  ]
end
```

```elixir
# 抓取 URL
{:ok, response} = Firecrawl.scrape_and_extract_from_url(
  url: "https://firecrawl.dev",
  formats: ["markdown"]
)

# 爬取网站
{:ok, response} = Firecrawl.crawl_urls(
  url: "https://docs.firecrawl.dev",
  limit: 50
)

# 搜索网页
{:ok, response} = Firecrawl.search_and_scrape(
  query: "best AI data tools 2024",
  limit: 10
)

# 映射 URL
{:ok, response} = Firecrawl.map_urls(url: "https://example.com")
```

### Rust

添加依赖：

```toml
[dependencies]
firecrawl = "2"
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }
```

```rust
use firecrawl::{Client, ScrapeOptions, Format, CrawlOptions};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = Client::new("fc-YOUR_API_KEY")?;

    // 抓取 URL
    let document = client.scrape("https://firecrawl.dev", None).await?;
    println!("{:?}", document.markdown);

    // 爬取网站
    let options = CrawlOptions {
        limit: Some(50),
        ..Default::default()
    };
    let result = client.crawl("https://docs.firecrawl.dev", options).await?;
    println!("Crawled {} pages", result.data.len());

    // 搜索网页
    let response = client.search("best web scraping tools 2024", None).await?;
    println!("{:?}", response.data);

    Ok(())
}
```

### 社区 SDK

- [Go SDK](https://github.com/firecrawl/firecrawl/tree/main/apps/go-sdk)

---

## 集成

**智能体与 AI 工具**
- [Firecrawl Skill](https://docs.firecrawl.dev/sdks/cli)
- [Firecrawl CLI Skills](https://github.com/firecrawl/cli#agent-skills)
- [Firecrawl Workflows](https://github.com/firecrawl/firecrawl-workflows)
- [Firecrawl MCP](https://github.com/mendableai/firecrawl-mcp-server)

**平台**
- [Lovable](https://docs.lovable.dev/integrations/firecrawl)
- [Zapier](https://zapier.com/apps/firecrawl/integrations)
- [n8n](https://n8n.io/integrations/firecrawl/)

[查看所有集成 →](https://www.firecrawl.dev/integrations)

**没有你喜欢的工具？** [提交 issue](https://github.com/mendableai/firecrawl/issues) 告诉我们！

---

## 资源

- [文档](https://docs.firecrawl.dev)
- [API 参考](https://docs.firecrawl.dev/api-reference/introduction)
- [Playground](https://firecrawl.dev/playground)
- [更新日志](https://firecrawl.dev/changelog)

---

## 开源 vs 云端

Firecrawl 基于 AGPL-3.0 许可证开源。[firecrawl.dev](https://firecrawl.dev) 云端版本包含额外功能：

![Open Source vs Cloud](https://raw.githubusercontent.com/firecrawl/firecrawl/main/img/open-source-cloud.png)

要在本地运行，请参阅[贡献指南](https://github.com/firecrawl/firecrawl/blob/main/CONTRIBUTING.md)。要自行托管，请参阅[自托管指南](https://docs.firecrawl.dev/contributing/self-host)。

---

## 贡献

我们欢迎贡献！在提交 pull request 之前，请阅读我们的[贡献指南](https://github.com/firecrawl/firecrawl/blob/main/CONTRIBUTING.md)。

### 贡献者

<a href="https://github.com/firecrawl/firecrawl/graphs/contributors">
  <img alt="contributors" src="https://contrib.rocks/image?repo=firecrawl/firecrawl"/>
</a>

---

## 许可证

本项目主要基于 GNU Affero General Public License v3.0（AGPL-3.0）许可证授权。SDK 和部分 UI 组件基于 MIT 许可证授权。详情请参见各目录中的 LICENSE 文件。

---

**最终用户有责任在抓取时遵守网站政策。** 建议用户遵守适用的隐私政策和使用条款。默认情况下，Firecrawl 会遵守 robots.txt 指令。使用 Firecrawl 即表示你同意遵守这些条件。

<p align="right" style="font-size: 14px; color: #555; margin-top: 20px;">
  <a href="#readme-top" style="text-decoration: none; color: #007bff; font-weight: bold;">
    ↑ 返回顶部 ↑
  </a>
</p>
