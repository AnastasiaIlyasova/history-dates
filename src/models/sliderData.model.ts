export type sliderData = sliderDataElement[];

export type sliderDataElement = {
  range: string;
  title: string;
  order: number;
  events: sliderDataEvents[];
}

type sliderDataEvents = {
  year: number;
  details: string;
}