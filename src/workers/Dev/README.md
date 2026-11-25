# Dev

## DevWorker  

Render pages on request for local development.

### Constructor  

**<code>new DevWorker(): DevWorker</code>**

## getData  

**<code>getData(): Promise&lt;RenderAllData&gt;</code>**  

Data from dev JSON stored for render.

### Returns  

<code>Promise&lt;RenderAllData&gt;</code>

## fetch  

**<code>fetch(request: WorkerRequest): Promise&lt;Response&gt;</code>**  

Route serverless and serve assets.

### Parameters  
- **`request`** <code><a href="/src/workers/README.md#workerrequest">WorkerRequest</a></code> required

### Returns  

<code>Promise&lt;Response&gt;</code>