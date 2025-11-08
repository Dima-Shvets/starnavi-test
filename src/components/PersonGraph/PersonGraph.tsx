import { ReactFlow, Background } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { usePersonGraph } from "@/hooks/usePersonGraph";

export default function PersonGraph() {
  const { nodes, edges, isLoading, error } = usePersonGraph();

  return (
    <div className="w-full h-screen">
      {isLoading && <div>Завантаження графа...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!isLoading && nodes.length > 0 && (
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Background />
        </ReactFlow>
      )}
    </div>
  );
}
