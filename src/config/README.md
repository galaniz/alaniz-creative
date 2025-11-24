# Config

## configContainerNumbers  

Container numbers.  

**Type:** <code>Object&lt;<a href="#configcontainer">ConfigContainer</a>, number&gt;</code>

## configBreakpointNumbers  

Breakpoint numbers.  

**Type:** <code><a href="#configbreakpoint">ConfigBreakpoint</a>[]</code>

## configColumnFloats  

Column floats.  

**Type:** <code>Object&lt;<a href="#configcolumn">ConfigColumn</a>, number&gt;</code>

## configBlobs  

Blob paths.  

**Type:** <code>Map&lt;<a href="#configblob">ConfigBlob</a>, string&gt;</code>

## configVars  

Style, script, svg and template options.  

**Type:** <code><a href="#configvars">ConfigVars</a></code>

## config  

Base, content and render type options.  

**Type:** <code>Config</code>

## Types

### ConfigContainer  

**Type:** <code>&#39;default&#39; | &#39;2xl&#39; | &#39;xl&#39; | &#39;l&#39; | &#39;m&#39; | &#39;s&#39; | &#39;xs&#39;</code>

### ConfigBreakpoint  

**Type:** <code>0 | 600 | 900 | 1200</code>

### ConfigColumn  

**Type:** <code>&#39;12&#39; | &#39;11&#39; | &#39;10&#39; | &#39;9&#39; | &#39;8&#39; | &#39;7&#39; | &#39;6&#39; | &#39;5&#39; | &#39;4&#39; | &#39;3&#39; | &#39;2&#39; | &#39;1&#39;</code>

### ConfigBlob  

**Type:** <code>&#39;one&#39; | &#39;two&#39; | &#39;three&#39; | &#39;four&#39; | &#39;five&#39; | &#39;six&#39;</code>

### ConfigVarsSvg  

**Type:** <code>object</code>

#### Properties  
- **`viewBox`** <code>string</code> required  
- **`output`** <code>string</code> required

### ConfigVarsCss  

**Type:** <code>object</code>

#### Properties  
- **`in`** <code>string</code> required  
- **`out`** <code>string</code> required  
- **`replace`** <code>string</code> required  
- **`cache`** <code>Map&lt;string, string&gt;</code> required  
- **`safelist`** <code>string[]</code> required

### ConfigVarsJs  

**Type:** <code>object</code>

#### Properties  
- **`in`** <code>string</code> required  
- **`out`** <code>string</code> required

### ConfigVars  

**Type:** <code>object</code>

#### Properties  
- **`local`** <code>boolean</code> required  
- **`svg`** <code>Map&lt;string, <a href="#configvarssvg">ConfigVarsSvg</a>&gt;</code> required  
- **`template`** <code>Map&lt;string, string&gt;</code> required  
- **`style`** <code>Set&lt;string&gt;</code> required  
- **`noscript`** <code>Set&lt;string&gt;</code> required  
- **`css`** <code><a href="#configvarscss">ConfigVarsCss</a></code> required  
- **`js`** <code><a href="#configvarsjs">ConfigVarsJs</a></code> required  
- **`formId`** <code>string</code> required