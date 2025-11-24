# Esbuild

## isWatch  

Watch state.  

**Type:** <code>boolean</code>

## isSite  

Build site.  

**Type:** <code>boolean</code>

## siteFiles  

Site files.  

**Type:** <code>string[]</code>

## siteCopyAssets  

Site copy assets.  

**Type:** <code>Object&lt;string, string&gt;</code>

## siteArgs  

Site context args.  

**Type:** <code>BuildOptions</code>

## esbuildScss  

**<code>esbuildScss(): Plugin</code>**  

Transform scss content.

### Returns  

<code>Plugin</code>

## esbuildHtml  

**<code>esbuildHtml(args: object, args.outDir?: string, args.watch?: boolean, args.copy?: Object&lt;string, string&gt;): Plugin</code>**  

Create site HTML files.

### Parameters  
- **`args`** <code>object</code> required  
- **`args.outDir`** <code>string</code> optional  
- **`args.watch`** <code>boolean</code> optional  
Default: `false`  
- **`args.copy`** <code>Object&lt;string, string&gt;</code> optional

### Returns  

<code>Plugin</code>

## argExists  

**<code>argExists(a: string): boolean</code>**  

Check if arg exists.

### Parameters  
- **`a`** <code>string</code> required

### Returns  

<code>boolean</code>