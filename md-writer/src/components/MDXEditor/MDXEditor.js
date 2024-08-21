"use client";
import simpleSandpackConfig from './code-blocks'
import imageUploadHandler  from './imageUploadHandler';
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    sandpackPlugin,
    imagePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    InsertFrontmatter,
    AdmonitionDirectiveDescriptor,
    directivesPlugin,
    tablePlugin,
    UndoRedo, 
     
    toolbarPlugin, 
    InsertTable,
    MDXEditor,
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    ChangeAdmonitionType,
    ChangeCodeMirrorLanguage,
    CodeToggle,
    CreateLink,
    DiffSourceToggleWrapper,
    InsertAdmonition,
    InsertCodeBlock,
  
    InsertImage,
    InsertSandpack,
    ListsToggle,
    ShowSandpackInfo,
    ConditionalContents,

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
      contentEditableClassName="prose"
      
      plugins={[
        directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        
        codeBlockPlugin({defaultCodeBlockLanguage: 'js'}),
        sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
        codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', css: 'CSS' } }),

        imagePlugin({
          imageUploadHandler: () => {
            imageUploadHandler
          },
          imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
        }),

        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <InsertTable/>
              <InsertSandpack/>
              <InsertImage />
              <InsertCodeBlock/>
              {/* <AdmonitionDirectiveDescriptor/> */}
              <BlockTypeSelect/>
              <ListsToggle/>
              {/* <ShowSandpackInfo/> */}
              {/* <ChangeAdmonitionType/> */}
              <CreateLink/>
              <InsertAdmonition/>

              <DiffSourceToggleWrapper/>
              {/* <ConditionalContents
                options={[
                    { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                    { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                    { fallback: () => ( <> 
                    <InsertCodeBlock />
                    <InsertSandpack />
                  </>) }
                  ]}
              /> */}
             </>
          )
        })
      ]}
    />
  );
};

export default Editor;