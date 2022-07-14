export interface ShiftsResInterface {
  id: number;
  name: string;
  from: string;
  to: string;
}

export interface ShiftsInterface {
  label: string;
  value: {
    from: string;
    to: string;
  };
}

export interface PageInfoInterface {
  name: string;
  from: string;
  to: string;
  isRawData: boolean;
  products: string[];
  shifts: ShiftsInterface[];
}

function state(): PageInfoInterface {
  return {
    name: '',
    from: '',
    to: '',
    isRawData: false,
    products: [],
    shifts: [],
  };
}

export default state;
