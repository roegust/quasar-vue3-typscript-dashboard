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
  name: string;
  date: string;
  isAfternoon: boolean;
  products: ProductInterface[];
  rawData: ProductProcessRecord[];
}

const state = (): ProductsInterface => ({
  name: '',
  date: '',
  isAfternoon: false,
  products: [],
  rawData: [],
});

export default state;
