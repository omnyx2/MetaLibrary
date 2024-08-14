"use client";

import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    InsertFrontmatter,
    tablePlugin,
    UndoRedo, BoldItalicUnderlineToggles, toolbarPlugin, InsertTable,
    MDXEditor,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
 
/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */

const Editor = ({ markdown, editorRef, handleOnChange}, props) => {
  return (
    <MDXEditor
      {...props}
      onChange={(e) => handleOnChange(e)}
      ref={editorRef}
      markdown={markdown}
      contentEditableClassName="prose lg:prose-sm"
      plugins={[        
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <InsertTable/>
             </>
          )
        })
      ]}
    />
  );
};

export default Editor;