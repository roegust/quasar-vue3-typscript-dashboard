export interface PageInfoInterface {
  name: string;
  from: string;
  to: string;
  isAfternoon: boolean;
  isRawData: boolean;
}

function state(): PageInfoInterface {
  return {
    name: '',
    from: '',
    to: '',
    isAfternoon: false,
    isRawData: false,
  };
}

export default state;
