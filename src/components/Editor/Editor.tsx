import LightTheme from './themes/LightTheme';
// TODO: import TreeViewPlugin from './plugins/TreeViewPlugin';
// TODO: import ToolbarPlugin from './plugins/ToolbarPlugin';

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListItemNode, ListNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { TRANSFORMERS } from '@lexical/markdown';

const Placeholder = () => {
  return <div className="editor-placeholder">Enter some rich text...</div>
}

const editorConfig = {
  namespace: 'Editor',
  theme: LightTheme,
  onError(error: any) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ]
};

const Editor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {/* TODO: <ToolbarPlugin /> */}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  )
};

export default Editor;
