import { useEffect, useState } from "react";
import type { Edge, Node } from "@xyflow/react";
import layoutUtil from "@/utils/layout";

type UseFlowLayoutParams = {
  nodes: Node[];
  edges: Edge[];
}

export const useFlowLayout = (params: UseFlowLayoutParams) => {

  const [nodes, setNodes] = useState(params.nodes);
  const [edges, setEdges] = useState(params.edges);

  useEffect(() => {


    (async () => {

      const { nodes: layoutedNodes, edges: layoutEdges } = await layoutUtil.layoutMindmap (nodes, edges); 

      setNodes(layoutedNodes);
      setEdges(layoutEdges);

    })();

  }, []);

  return {
    nodes,
    setNodes,
    edges,
    setEdges,
  }

} 