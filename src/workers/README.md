# Workers

## workerServerlessSetup  

**<code>workerServerlessSetup(env?: Generic): </code>**  

Set up config, filters, actions and store in serverless context.

### Parameters  
- **`env`** <code>Generic</code> optional

## workerServerlessFilter  

**<code>workerServerlessFilter(request: WorkerRequest): Promise&lt;boolean&gt;</code>**  

Filter worker responses for password protection.

### Parameters  
- **`request`** <code><a href="#workerrequest">WorkerRequest</a></code> required

### Returns  

<code>Promise&lt;boolean&gt;</code>

## workerServerlessTurnstile  

**<code>workerServerlessTurnstile(data: ServerlessActionData, request: Request, env: WorkerEnv): Promise&lt;void&gt;</code>**  

Verify Turnstile token.

### Parameters  
- **`data`** <code>ServerlessActionData</code> required  
- **`request`** <code>Request</code> required  
- **`env`** <code><a href="#workerenv">WorkerEnv</a></code> required

### Returns  

<code>Promise&lt;void&gt;</code>

## Types

### WorkerRequest  

**Type:** <code>object</code>  

**Augments:** <code>Request</code>

#### Properties  
- **`cf`** <code>IncomingRequestCfProperties</code> optional

### WorkerEnv  

**Type:** <code>object</code>  

**Augments:** <code>Generic</code>

#### Properties  
- **`CF_TURNSTILE_KEY`** <code>string</code> optional