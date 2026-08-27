# Schema

## schemaTypes  

Content types the editing tools own, and therefore validate.  

**Type:** <code>string[]</code>

## referenceOption  

**Type:** <code></code>

## imageKeyOption  

**Type:** <code></code>

## contentSchema  

**Type:** <code></code>

## validateContent  

**<code>validateContent(dir?: string): Promise&lt;void&gt;</code>**  

Validate every editable content file against the shared schema.

### Parameters  
- **`dir`** <code>string</code> optional  
Default: `'data'`

### Returns  

<code>Promise&lt;void&gt;</code>

## getIssuePath  

**<code>getIssuePath(path: PropertyKey[]): string</code>**  

Turn a dotted and bracketed path into something an editor can locate.

### Parameters  
- **`path`** <code>PropertyKey[]</code> required

### Returns  

<code>string</code>

## getIssueDepth  

**<code>getIssueDepth(issues: z.core.$ZodIssue[]): number</code>**  

Depth of the deepest path in a set of issues.

### Parameters  
- **`issues`** <code>z.core.$ZodIssue[]</code> required

### Returns  

<code>number</code>

## flattenIssues  

**<code>flattenIssues(issues: z.core.$ZodIssue[], prefix?: PropertyKey[]): SchemaIssue[]</code>**  

Flatten issues into paths and messages, unwrapping a failed union to the
branch that got furthest.

### Parameters  
- **`issues`** <code>z.core.$ZodIssue[]</code> required  
- **`prefix`** <code>PropertyKey[]</code> optional

### Returns  

<code><a href="#schemaissue">SchemaIssue</a>[]</code>

## getSchemaIssues  

**<code>getSchemaIssues(error: z.ZodError): SchemaIssue[]</code>**  

Flatten a zod error into paths and messages.

### Parameters  
- **`error`** <code>z.ZodError</code> required

### Returns  

<code><a href="#schemaissue">SchemaIssue</a>[]</code>

## parsePage  

**<code>parsePage(data: unknown): SchemaResult</code>**  

Validate a page against the shared schema.

### Parameters  
- **`data`** <code>unknown</code> required

### Returns  

<code><a href="#schemaresult">SchemaResult</a></code>

## getSchemaIssuesMessage  

**<code>getSchemaIssuesMessage(issues: SchemaIssue[]): string</code>**  

Render issues as a list an editor can act on.

### Parameters  
- **`issues`** <code><a href="#schemaissue">SchemaIssue</a>[]</code> required

### Returns  

<code>string</code>

## Types

### SchemaIssue  

**Type:** <code>object</code>

#### Properties  
- **`path`** <code>string</code> required  
- **`message`** <code>string</code> required

### SchemaPage  

**Type:** <code>object</code>

### SchemaResult  

**Type:** <code>object</code>

#### Properties  
- **`valid`** <code>boolean</code> required  
- **`page`** <code><a href="#schemapage">SchemaPage</a></code> optional  
- **`issues`** <code><a href="#schemaissue">SchemaIssue</a>[]</code> required