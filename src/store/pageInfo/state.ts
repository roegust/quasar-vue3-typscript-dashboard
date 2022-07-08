export interface PageInfoInterface {
  name: string;
  date: string;
  isAfternoon: boolean;
  isRawData: boolean;
}

function state(): PageInfoInterface {
  return {
    name: '',
    date: '',
    isAfternoon: false,
    isRawData: false,
  };
}

export default state;
