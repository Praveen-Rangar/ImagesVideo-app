export type Image = {
  id: number;
  width: number;
  height: number;
  src: {
    original?: string;
    medium?: string;
    tiny?: string;
  };
  url: string;
};
