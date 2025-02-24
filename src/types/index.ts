import type { Node, Edge } from "@xyflow/react";

export type ContentTreeNode = {
  id: string;
  data: Record<string, any>;
  children?: ContentTreeNode[];
}

export type FormattedContentTreeNode = { 
  nodes: Node[];
  edges: Edge[]
}
