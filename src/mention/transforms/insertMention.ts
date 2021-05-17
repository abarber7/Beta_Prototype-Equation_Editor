import { Editor, Transforms } from 'slate';
import { setDefaults } from '@udecode/slate-plugins';
import { DEFAULTS_MENTION } from '../defaults';
import { MentionNode, MentionNodeData, MentionPluginOptions } from '../types';
import { getEmptyFractionNode } from '../../Components/Fraction/thfraction/getEmptyFractionNode'
import { getEmptySummationNode } from '../../Components/Summation/getEmptySummationNode';
import { getEmptyBigOpNode } from '../../Components/BigOperator/getEmptyBigOpNode'
import {getEmptyIntegralNode} from '../../Components/Integral/getEmptyIntegralNode'
import {getEmptyLimNode} from '../../Components/Limit/getEmptyLimNode'

export const insertMention = (
  editor: Editor,
  mentionable: MentionNodeData,
  options?: MentionPluginOptions
) => {
  const { mention } = setDefaults(options, DEFAULTS_MENTION);

  const mentionNode: MentionNode = {
    type: mention.type,
    children: [{ text: '' }],
    ...mentionable,
  };

  if (mentionNode.test.match("integralcomponent")) {
    Transforms.insertNodes(editor, getEmptyIntegralNode());
    Transforms.move(editor);
  }
  else if (mentionNode.test.match("fraction")){
    Transforms.insertNodes(editor, getEmptyFractionNode());
    Transforms.move(editor);
  }
  else if (mentionNode.test.match("sumcomponent")){
    Transforms.insertNodes(editor, getEmptySummationNode());
    Transforms.move(editor);
  }
  else if (mentionNode.test.match("limcomponent")){
    Transforms.insertNodes(editor, getEmptyLimNode());
    Transforms.move(editor);
  }
  else if (mentionNode.test.match("bigoperator")){
    Transforms.insertNodes(editor, getEmptyBigOpNode());
    Transforms.move(editor);
  }
  else {
    Transforms.insertNodes(editor, mentionNode);
    Transforms.move(editor);
  }
};
