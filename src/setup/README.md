# Setup

## localDataArgs  

Props resolved to entries and props removed from references.  

**Type:** <code>AllLocalDataArgs</code>

## writeJson  

**<code>writeJson(outFile: string, data: unknown): Promise&lt;void&gt;</code>**  

Write JSON file, creating its directory if needed.

### Parameters  
- **`outFile`** <code>string</code> required  
- **`data`** <code>unknown</code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## writeLocalData  

**<code>writeLocalData(): Promise&lt;boolean&gt;</code>**  

Validate data files and merge and normalize them into one file the local worker imports.

### Returns  

<code>Promise&lt;boolean&gt;</code>

## setupLocal  

**<code>setupLocal(): Promise&lt;FSWatcher&gt;</code>**  

Write data for the local worker and rewrite it when data files change.

### Returns  

<code>Promise&lt;FSWatcher&gt;</code>

## setPostsData  

**<code>setPostsData(data?: RenderAllData): void</code>**  

Store whole type items for posts.

### Parameters  
- **`data`** <code>RenderAllData</code> optional

### Returns  

<code>void</code>

## setupBuild  

**<code>setupBuild(): Promise&lt;RenderReturn&gt;[]</code>**  

Set up config, filters, actions and fetch/render in build context.

### Returns  

<code>Promise&lt;RenderReturn&gt;[]</code>