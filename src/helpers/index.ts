import path from "node:path";
import formidable from "formidable";
import { colors } from "@/data";
import type { Node, Edge } from "@xyflow/react";
import type { ContentTreeNode, FormattedContentTreeNode } from "@/types";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const isPDFValid = (file: formidable.File) => {

  const mimeType = file.mimetype;
  const filename = file.originalFilename;

  if (!mimeType || !filename) {
    return false;
  }

  const validMimeType = file.mimetype === "application/pdf";
  const validExtension = path.extname(filename).toLowerCase() === ".pdf";

  return validMimeType && validExtension;
}

export const formatTreeContent = ( tree: ContentTreeNode, parentId?: string, nodes: Node[] = [], edges: Edge[] = [], index: number = 0): FormattedContentTreeNode => {

  nodes.push({
    id: tree.id,
    parentId: parentId,
    data: tree.data,
    style: { backgroundColor: colors[index] },
    position: { x: 0, y: 0 }
  });

  if (parentId) {
    edges.push({
      id: `${parentId}-${tree.id}`,
      source: parentId,
      target: tree.id
    });
  }

  index += 1;

  if (tree.children && tree.children.length > 0) {
    for (const child of tree.children) {
      formatTreeContent(child, tree.id, nodes, edges, index);
    }
  }

  return { nodes, edges };
  
}
