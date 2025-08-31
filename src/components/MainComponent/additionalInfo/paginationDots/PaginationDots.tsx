import { Dispatch, SetStateAction } from "react";
import { sliderData, sliderDataElement } from "../../../../models/sliderData.model";
import css from "./paginationDots.module.scss"
import classNames from "classnames";

type Props = {
  sliderData: sliderData;
  activeIndex: number;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export const PaginationDots = ({ sliderData, activeIndex, setSelectedDate }: Props) => {
  const handleDotClick = (item: sliderDataElement, index: number) => {
    setSelectedDate(item.range);
  };

  return (
    <div className={css.dots__wrapper}>
      {sliderData.map((item, index) => (
        <div
          key={index}
          className={classNames(css.dot, index + 1 === activeIndex && css.dot__active )}
          onClick={() => handleDotClick(item, index)}
        />
      ))}
    </div>
  )
}