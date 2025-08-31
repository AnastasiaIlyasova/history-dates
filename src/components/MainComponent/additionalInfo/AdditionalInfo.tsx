import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../../styles/swiper.scss';
import css from "./additionalInfo.module.scss"
import { sliderData } from '../../../content/sliderData';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { PaginationDots } from './paginationDots';
import { SliderButtons } from './sliderButtons';

type Props = {
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export const AdditionalInfo = ({ selectedDate, setSelectedDate }: Props) => {
  const [show, setShow] = useState(true);
  const [currentData, setCurrentData] = useState(
    sliderData.filter((item) => item.range === selectedDate)[0]
  );

  useEffect(() => {
    setShow(false);

    const timer = setTimeout(() => {
      const newData = sliderData.filter((item) => item.range === selectedDate)[0];

      setCurrentData(newData);
      setShow(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedDate]);

  if (!currentData) return null;

  return (
    <div className={css.wrapper}>
      <div
        className={`${css.swiper__animated} ${show ? css.fadeIn : css.fadeOut}`}
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={80}
          navigation={{
            prevEl: '.swiper__button-prev',
            nextEl: '.swiper__button-next',
          }}
          slidesPerView={3.3}
          breakpoints={{
            0: {
              slidesPerView: 1.7,
              spaceBetween: 25,
            },
            900: {
              slidesPerView: 3.3,
              spaceBetween: 80,
            },
          }}
          key={selectedDate}
        >
          {currentData.events.map((item) => (
            <SwiperSlide key={item.year}>
              <div className={css.swiper__slide}>
                <div className={css.swiper__slide_title}>{item.year}</div>
                <div className={css.swiper__slide_text}>{item.details}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <SliderButtons/>
      </div>

      <PaginationDots sliderData={sliderData} activeIndex={currentData.order} setSelectedDate={setSelectedDate}/>
    </div>
  );
};