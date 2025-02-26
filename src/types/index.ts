import type { Node, Edge } from "@xyflow/react";
import type { LanguageModelV1 } from "ai";

export type ContentTreeNode = {
  id: string;
  data: Record<string, any>;
  children?: ContentTreeNode[];
  className?: string;
  style?: Record<string, any>
}

export type FormattedContentTreeNode = { 
  nodes: Node[];
  edges: Edge[]
}

export type AIServiceProps = {
  model: LanguageModelV1;
}

export type AnswerProps = {
  system: string;
  prompt: string;
}