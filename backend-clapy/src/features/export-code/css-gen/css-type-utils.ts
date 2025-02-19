import type { CssNode, Declaration, DeclarationPlain, List, Rule, Selector, SelectorList, StyleSheet } from 'css-tree';

import type { Dict } from '../../sb-serialize-preview/sb-serialize.model.js';
import { csstree } from '../create-ts-compiler/csstree.js';

export function isStyleSheet(node: CssNode): node is StyleSheet {
  return node.type === 'StyleSheet';
}

export function assertStyleSheet(node: CssNode): asserts node is StyleSheet {
  if (node.type !== 'StyleSheet') {
    throw new Error(`Node is not StyleSheet: ${JSON.stringify(node)}`);
  }
}

export function isRule(node: CssNode): node is Rule {
  return node.type === 'Rule';
}

export function isSelectorList(node: CssNode): node is SelectorList {
  return node.type === 'SelectorList';
}

export function isSelector(node: CssNode): node is Selector {
  return node.type === 'Selector';
}

export function isDeclarationListOrThrow(node: List<CssNode>): node is List<Declaration> {
  const first = node.first;
  const isDecl = node.size === 0 || isDeclaration(first as CssNode);
  if (!isDecl) throw new Error(`Not a List<Declaration>: ${JSON.stringify(node)}`);
  return isDecl;
}

export function isDeclaration(node: CssNode): node is Declaration {
  return node.type === 'Declaration';
}

// More specific utilities

export function isRootRule(node: Rule) {
  const selector = getRuleFirstSelector(node);
  return csstree.generate(selector) === '.root';
}

function getRuleFirstSelector(node: Rule) {
  if (!isSelectorList(node.prelude)) {
    throw new Error(`rule prelude is not a SelectorList: ${JSON.stringify(node.prelude)}`);
  }
  const firstSelector = node.prelude.children.first;
  if (!firstSelector) {
    throw new Error(`rule has no selector in SelectorList: ${JSON.stringify(node.prelude)}`);
  }
  if (!isSelector(firstSelector)) {
    throw new Error(`rule first SelectorList child is not a Selector: ${JSON.stringify(node.prelude)}`);
  }
  return firstSelector;
}

export function stylesToList(styles: Dict<DeclarationPlain>): DeclarationPlain[] {
  return Object.values(styles);
}

export function listToStyles(styleDeclarations: DeclarationPlain[]) {
  const styles: Dict<DeclarationPlain> = {};
  for (const decl of styleDeclarations) {
    styles[decl.property] = decl;
  }
  return styles;
}
