# Column  

**<code>Column(props: ColumnProps): ColumnProps</code>**  

Filter formation column props.

## Parameters  
- **`props`** <code><a href="#columnprops">ColumnProps</a></code> required

## Returns  

<code><a href="#columnprops">ColumnProps</a></code>

## Types

### ColumnWidthCustom  

**Type:** <code>object</code>

#### Properties  
- **`init`** <code>number</code> optional  
- **`small`** <code>number</code> optional  
- **`medium`** <code>number</code> optional  
- **`large`** <code>number</code> optional

### ColumnPosition  

**Type:** <code>&#39;top-left&#39; | &#39;top-left-10&#39; | &#39;top-right&#39; | &#39;top-right-10&#39; | &#39;bottom-left&#39; | &#39;bottom-left-10&#39; | &#39;bottom-right&#39; | &#39;bottom-right-10&#39;</code>

### ColumnArgs  

**Type:** <code>object</code>  

**Augments:** <code>FormationColumnArgs</code>

#### Properties  
- **`grow`** <code>boolean</code> optional  
Default: `false`  
- **`widthCustom`** <code><a href="#columnwidthcustom">ColumnWidthCustom</a></code> optional  
- **`position`** <code><a href="#columnposition">ColumnPosition</a></code> optional  
- **`justify`** <code><a href="/src/config/README.md#configjustify">ConfigJustify</a></code> optional  
- **`align`** <code><a href="/src/config/README.md#configalign">ConfigAlign</a></code> optional

### ColumnProps  

**Type:** <code>object</code>  

**Augments:** <code>RenderFunctionArgs</code>

#### Properties  
- **`args`** <code><a href="#columnargs">ColumnArgs</a></code> required  
- **`itemData`** <code><a href="/src/global/README.md#item">Item</a></code> optional