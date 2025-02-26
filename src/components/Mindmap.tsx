import { useCallback } from 'react';
import { ReactFlow , Background, Controls, MiniMap, applyEdgeChanges, applyNodeChanges,} from '@xyflow/react';
import { SineEdge } from '@/components/SineEdge';
import { useFlowLayout } from '@/hooks/use-flow-layout';
import { formatTreeContent } from '@/helpers';
import '@xyflow/react/dist/style.css';

type MindmapProps = {
  mindmap: any;
}

const Mindmap = ({ mindmap }: MindmapProps) => {

  const { nodes: nodes_, edges: edges_ }  = formatTreeContent(mindmap);

  const {
    nodes,
    setNodes,
    edges,
    setEdges,
  } = useFlowLayout ({ nodes: nodes_, edges: edges_ });

  const onNodesChange = useCallback ((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback ((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  return (
    <div className='h-full w-full'>
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        edgeTypes={{ sine: SineEdge }}
      >
        <Background />
        <Controls />
        <MiniMap className='border-2 border-gray-900' />
      </ReactFlow>
    </div>
  );

}

export default Mindmap;