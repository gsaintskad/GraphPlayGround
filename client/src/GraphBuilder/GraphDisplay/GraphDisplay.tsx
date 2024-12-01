import { useCallback, useEffect, useRef, useState } from "react";
import { GraphBuilderActions } from "@/GraphBuilder/graphBuilderActions.ts";
import { GraphNodeProps, GraphNode } from "@/GraphBuilder/GraphNode/GraphNode.tsx";

interface GraphDisplayProps {
    activeHandler: GraphBuilderActions;
}

const GraphDisplay = (props: GraphDisplayProps) => {
    const [nodeMap, setNodeMap] = useState<Map<string, GraphNodeProps>>(new Map());

    const [nodeRadius, setNodeRadius] = useState<number>(90)
    const divRef = useRef<HTMLDivElement | null>(null);

    // Handler to create a new node
    const createNodeHandler = useCallback(
        (e: MouseEvent) => {
            setNodeMap((prevNodeMap) => {
                const map = new Map(prevNodeMap);
                const dto: GraphNodeProps = {
                    id: (map.size + 1).toString(),
                    name: `Node ${map.size + 1}`, // Optional name for the node
                    x: e.offsetX-nodeRadius/2,
                    y: e.offsetY-nodeRadius/2,
                    radius:nodeRadius
                };
                map.set(dto.id, dto);
                console.log("Updated map after adding node:", map);
                return map;
            });

            console.log(
                `Mouse clicked at coordinates: (${e.offsetX}, ${e.offsetY}) during ${props.activeHandler}`
            );
        },
        [props.activeHandler]
    );
    const addEdgeHandler = useCallback(
        (e: MouseEvent) => {
            setNodeMap((prevNodeMap) => {
                const map = new Map(prevNodeMap);
                const dto: GraphNodeProps = {
                    id: (map.size + 1).toString(),
                    name: `Node ${map.size + 1}`, // Optional name for the node
                    x: e.offsetX-nodeRadius/2,
                    y: e.offsetY-nodeRadius/2,
                    radius:nodeRadius
                };
                map.set(dto.id, dto);
                console.log("Updated map after adding node:", map);
                return map;
            });

            console.log(
                `Mouse clicked at coordinates: (${e.offsetX}, ${e.offsetY}) during ${props.activeHandler}`
            );
        },
        [props.activeHandler]
    );
    // General handler for activeHandler-related events
    const handleEvent = useCallback(
        (e: MouseEvent) => {
            console.log(
                `Mouse clicked at coordinates: (${e.offsetX}, ${e.offsetY}) during ${props.activeHandler}`
            );
        },
        [props.activeHandler]
    );

    // Attach and remove event listener on the parent div
    useEffect(() => {
        const divElement = divRef.current;

        if (props.activeHandler === "create" && divElement) {
            divElement.addEventListener("click", createNodeHandler);
            console.log("CreateNodeHandler added");
        } else if (props.activeHandler && divElement) {
            divElement.addEventListener("click", handleEvent);
            console.log(`Event listener added to div for ${props.activeHandler}`);
        }

        return () => {
            if (divElement) {
                divElement.removeEventListener("click", createNodeHandler);
                divElement.removeEventListener("click", handleEvent);
                console.log("Event listeners removed");
            }
        };
    }, [props.activeHandler, createNodeHandler, handleEvent]);

    // Render the GraphNodes based on the nodeMap
    const renderNodes = () => {
        return Array.from(nodeMap.values()).map((node) => (
            <GraphNode key={node.id} {...node} />
        ));
    };

    return (
        <div ref={divRef} className="relative w-full h-full">
            {/* Render nodes dynamically */}
            {renderNodes()}
        </div>
    );
};

export default GraphDisplay;
