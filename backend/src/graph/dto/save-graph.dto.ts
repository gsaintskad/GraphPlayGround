import { NodeDto, EdgeDto } from './graph.dto';

export class SaveGraphDto {
  nodes: Record<string, NodeDto>;
  edges: Record<string, EdgeDto>;
}
