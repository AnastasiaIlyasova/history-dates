import classNames from "classnames";
import { sliderData, sliderDataElement } from "../../../../models/sliderData.model";
import css from "./navigationBlock.module.scss"
import { ArrowIcon } from "../../../shared/icons";

type Props = {
  neededData: sliderDataElement;
  sliderData: sliderData;
  currentIndex: number;
  handleArrowClick: (direction: 'left' | 'right') => void;
}

export const NavigationBlock = ({ neededData, sliderData, currentIndex, handleArrowClick } : Props) => {
  return (
    <div className={css.navigation}>
      <div className={css.counter}>
        {neededData.order > 9 ? '' : '0'}
        {neededData.order}/{sliderData.length > 9 ? '' : '0'}
        {sliderData.length}
      </div>

      <div className={css.arrows}>
          <button className={classNames(css.arrows__arrow, css.arrows__arrow__left, currentIndex <= 0 && css.arrows__arrow__disabled)} onClick={() => handleArrowClick('left')}>
            <ArrowIcon/>
          </button>
          <button className={classNames(css.arrows__arrow, css.arrows__arrow__right, currentIndex >= sliderData.length - 1 && css.arrows__arrow__disabled)} onClick={() => handleArrowClick('right')}>
            <ArrowIcon/>
          </button>
      </div>
    </div>
  )
}