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

## setupDev  

**<code>setupDev(): Promise&lt;void&gt;</code>**  

Validate data files and write them with image metadata as one file the dev worker imports.

### Returns  

<code>Promise&lt;void&gt;</code>

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