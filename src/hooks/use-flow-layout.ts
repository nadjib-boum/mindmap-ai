import { useEffect, useState } from "react";
import { layoutMindmap } from "@/helpers";
import type { Edge, Node } from "@xyflow/react";

type UseFlowLayoutParams = {
  nodes: Node[];
  edges: Edge[];
}

export const useFlowLayout = (params: UseFlowLayoutParams) => {

  const [nodes, setNodes] = useState(params.nodes);
  const [edges, setEdges] = useState(params.edges);

  useEffect(() => {


    (async () => {

      const { nodes: layoutedNodes, edges: layoutEdges } = await layoutMindmap (nodes, edges); 

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