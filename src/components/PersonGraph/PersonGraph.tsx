import { ReactFlow, Background } from "@xyflow/react";
import { usePersonGraph } from "@/hooks/usePersonGraph";
import { useLocation } from "react-router";
import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import "@xyflow/react/dist/style.css";

export default function PersonGraph() {
  const { nodes, edges, isLoading, error } = usePersonGraph();
  const location = useLocation();
  const { personName = "" } = location.state;

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="page-title">{`Films and Starships graph of ${personName || "the Hero"}`}</h1>
      </div>
      <div className="w-full h-full">
        {isLoading && <LoadingSkeleton />}
        {error && <div className="text-red">{error}</div>}
        {!isLoading && nodes.length > 0 && (
          <ReactFlow nodes={nodes} edges={edges} fitView>
            <Background />
          </ReactFlow>
        )}
      </div>
    </>
  );
}

const LoadingSkeleton = () => {
  return <Skeleton className="w-full h-full" />;
};
