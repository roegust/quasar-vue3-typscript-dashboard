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
  shiftSelected: {
    from: string;
    to: string;
  };
  products: string[];
  shifts: ShiftsInterface[];
}

function state(): PageInfoInterface {
  return {
    name: '',
    from: '',
    to: '',
    isRawData: false,
    shiftSelected: {
      from: '',
      to: '',
    },
    products: [],
    shifts: [],
  };
}

export default state;
