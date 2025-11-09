import { ReactFlow, Background } from "@xyflow/react";
import { usePersonGraph } from "@/hooks/usePersonGraph";
import BackButton from "@/components/BackButton";
import { Skeleton } from "@/components/ui/skeleton";
import "@xyflow/react/dist/style.css";

export default function PersonGraph() {
  const { personName, nodes, edges, isLoading, error } = usePersonGraph();

  return (
    <>
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <BackButton />
        <h1 className="page-title">{`Films and Starships Graph of ${personName}`}</h1>
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
