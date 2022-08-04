export interface Details {
  productName: string;
  productID: string;
  carft: string;
  machineName: string;
  machineID: string;
  operation: string;
  estimatedProcessingTime: number;
  avgProcessingTime: number;
  target: number;
  actual: number;
  user: string;
}
export interface Frequency {
  label: string;
  value: number;
}

export interface SocketInterface {
  products: string[];
  frequency: Frequency;
  cards: Map<string, Details[]>;
}

function state(): SocketInterface {
  return {
    products: [],
    frequency: 0,
    cards: new Map(),
  };
}

export default state;
