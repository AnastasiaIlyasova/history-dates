import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../styles/swiper.scss';
import css from "./rangeInfo.module.scss"
import { sliderData } from '../../../content/sliderData';
import { sliderDataElement } from "../../../models/sliderData.model"
import classNames from 'classnames';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NavigationBlock } from './navigationBlock';
import { RangeDates } from './rangeDates';
import { MobileTitle } from './mobileTitle';

type Props = {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export const RangeInfo = ({ selectedDate, setSelectedDate }: Props) => {
  const neededData = sliderData.filter((item) => item.range === selectedDate)[0];
  const currentIndex = sliderData.findIndex((item) => item.range === selectedDate);
  const [rotation, setRotation] = useState(0);
  const radiusX = 536 / 2;
  const radiusY = 530 / 2;
  const [animatedRange, setAnimatedRange] = useState<{ start: number; end: number }>({
    start: parseInt(neededData.range.split('-')[0]),
    end: parseInt(neededData.range.split('-')[1]),
  });

  const activeIndex = sliderData.findIndex(item => item.range === selectedDate);
  const step = (2 * Math.PI) / sliderData.length;
  const angle = step * activeIndex + step / 2 + rotation;

  const x = radiusX + radiusX * Math.cos(angle);
  const y = radiusY + radiusY * Math.sin(angle);

  const titleX = x + 510;
  const titleY = y - 10;

  const rotateToIndex = (index: number) => {
    const step = (2 * Math.PI) / sliderData.length;
    const angle = step * index + step / 2;

    const targetAngle = -Math.PI / 4;
    const newRotation = targetAngle - angle;

    setRotation(newRotation);
  };

  const handleDotClick = (item: sliderDataElement, index: number) => {
    if (item.order === neededData.order) return;

    setSelectedDate(item.range);
    rotateToIndex(index);
  };

  const handleArrowClick = (direction: 'left' | 'right') => {
    let newIndex = currentIndex;

    if (direction === 'left' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'right' && currentIndex < sliderData.length - 1) {
      newIndex = currentIndex + 1;
    }

    if (newIndex !== currentIndex) {
      setSelectedDate(sliderData[newIndex].range);
      rotateToIndex(newIndex);
    }
  };

  useEffect(() => {
    const newStart = parseInt(neededData.range.split('-')[0]);
    const newEnd = parseInt(neededData.range.split('-')[1]);

    const currentStart = animatedRange.start;
    const currentEnd = animatedRange.end;

    const steps = 30;
    const duration = 800;
    const interval = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;

      const progress = currentStep / steps;

      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const animatedStart = Math.round(currentStart + (newStart - currentStart) * easeProgress);
      const animatedEnd = Math.round(currentEnd + (newEnd - currentEnd) * easeProgress);

      setAnimatedRange({ start: animatedStart, end: animatedEnd });

      if (currentStep === steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [animatedRange.end, animatedRange.start, neededData.range]);

  useEffect(() => {
    const index = sliderData.findIndex(item => item.range === selectedDate);

    rotateToIndex(index);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.wrapper}>
      <div className={css.circle__wrapper}>
        <div
          className={css.circle}
          style={{ transform: `rotate(${rotation}rad)` }}
        >
          {sliderData.map((item, i) => {
            const isItemActive = item.range === selectedDate;
            const pointSize = isItemActive ? '56' : '6';
            const angle = step * i + step / 2;
            const x = radiusX + radiusX * Math.cos(angle) - (+pointSize / 2);
            const y = radiusY + radiusY * Math.sin(angle) - (+pointSize / 2);

            return (
              <div
                key={i}
                className={classNames(css.point, isItemActive && css.point__active)}
                style={{
                  "--x": `${x}px`,
                  "--y": `${y}px`,
                  left: `${x}px`,
                  top: `${y}px`,
                  height: `${pointSize}px`,
                  width: `${pointSize}px`,
                } as React.CSSProperties}
                onClick={() => handleDotClick(item, i)}
              >
                <span className={css.point__order} style={{ transform: `rotate(${-rotation}rad)`,  transition: 'transform 0.8s ease-in-out', }}>
                  {item.order}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className={classNames(css.point__active_title, css.title__animated)}
          key={neededData.title}
          style={{
            position: 'absolute',
            left: `${titleX}px`,
            top: `${titleY}px`,
            transform: 'none',
            opacity: 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {neededData.title}
        </div>
      </div>

      <RangeDates animatedRange={animatedRange}/>

      <MobileTitle pointTitle={neededData.title}/>

      <NavigationBlock neededData={neededData} sliderData={sliderData} currentIndex={currentIndex} handleArrowClick={handleArrowClick}/>
    </div>
  );
};