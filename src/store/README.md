# Store

## imageMetaUrl  

Where the content worker serves image metadata, overridable per build.  

**Type:** <code>string</code>

## storeArgs  

Store values that are the same on every build.  

**Type:** <code>Store</code>

## getImageMeta  

**<code>getImageMeta(env: ContentEnv): Promise&lt;ContentImageMeta&gt;</code>**  

Read the image metadata.

### Parameters  
- **`env`** <code><a href="/src/workers/Content/README.md#contentenv">ContentEnv</a></code> required

### Returns  

<code>Promise&lt;<a href="/src/workers/Content/README.md#contentimagemeta">ContentImageMeta</a>&gt;</code>