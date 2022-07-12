export interface ProductProcessRecord {
  id: string;
  name: string;
  sn: string;
  operation: string;
  operator: string;
  machine: string;
  import: string;
  export: string;
  start: string;
  finished: string;
}

export interface ProcessRecordInterface {
  sn: string;
  importTime: number;
  exportTime: number;
  startProcessTime: number;
  finishProcessTime: number;
  timeZone: string;
}

export interface MachineInterface {
  operation: string;
  name: string;
  target: number;
  user: string;
  processRecords: ProcessRecordInterface[];
}

export interface ProductInterface {
  id: string;
  name: string;
  carft: string;
  machines: MachineInterface[];
}

export interface ProductsInterface {
  products: ProductInterface[];
  rawData: ProductProcessRecord[];
}

const state = (): ProductsInterface => ({
  products: [],
  rawData: [],
});

export default state;
