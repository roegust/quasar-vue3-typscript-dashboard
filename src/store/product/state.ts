export interface ProductProcessRecord {
  序號: string;
  產品料號: string;
  操作員: string;
  產品名稱: string;
  工序: string;
  設備: string;
  標準工時: string;
  上下料時間: string;
  單件加工時間: string;
  進站時間: string;
  加工開始時間: string;
  加工結束時間: string;
  出站時間: string;
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
  estimatedProcessingTime: number;
  avgProcessingTime: number;
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
