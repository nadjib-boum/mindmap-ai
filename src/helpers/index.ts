import path from "node:path";
import formidable from "formidable";
import ELK from "elkjs";
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

export const formatTreeContent = ( tree: ContentTreeNode, parentId?: string, nodes: Node[] = [], edges: Edge[] = []): FormattedContentTreeNode => {

  nodes.push({
    id: tree.id,
    parentId: parentId,
    data: tree.data,
    position: { x: 100, y: 100 }
  });

  if (parentId) {
    edges.push({
      id: `${parentId}-${tree.id}`,
      source: parentId,
      target: tree.id
    });
  }

  if (tree.children && tree.children.length > 0) {
    for (const child of tree.children) {
      formatTreeContent(child, tree.id, nodes, edges);
    }
  }

  return { nodes, edges };
  
}

export const layoutMindmap = async (nodes: Node[], edges: Edge[]) => {
  
  const elk = new ELK();
  
  const graph = {
    id: "root",
    layoutOptions: {
      "elk.algorithm": "mrtree",
      "elk.direction": "DOWN",
    },
    children: nodes.map((node) => ({
      id: String(node.id), // Convert IDs to strings explicitly
      width: 150,
      height: 50,
    })),
    edges: edges.map((edge) => ({
      id: String(edge.id),
      sources: [String(edge.source)], // Ensure these match node IDs
      targets: [String(edge.target)],
    })),
  };

  const layout = await elk.layout(graph);

  return {
    nodes: nodes.map((node, index) => ({
      ...node,
      position: { x: layout.children![index].x, y: layout.children![index].y },
    } as Node)),
    edges,
  };
};
