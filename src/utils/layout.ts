import ELK, { type ElkNode } from "elkjs";
import type { Node, Edge } from "@xyflow/react";

class LayoutUtil {

  private elk;

  constructor () {
    this.elk = new ELK ();
  }

  layoutMindmap = async (nodes: Node[], edges: Edge[]) => {
  
    const graph: ElkNode = {
      id: "root",
      layoutOptions: {
        'elk.algorithm': 'org.eclipse.elk.mrtree',
        'elk.direction':'DOWN',
      },
      children: nodes.map((node) => ({
        id: String(node.id),
        width: 150,
        height: 50,
      })),
      edges: edges.map((edge) => ({
        id: String(edge.id),
        sources: [String(edge.source)],
        targets: [String(edge.target)],
      })),
    };
  
    const layout = await this.elk.layout(graph);
  
    return {
      nodes: nodes.map((node, index) => ({
        ...node,
        position: { x: layout.children![index].x, y: layout.children![index].y },
      } as Node)),
      edges,
    };
  };
  
}


const layoutUtil = new LayoutUtil ();

export default layoutUtil;
