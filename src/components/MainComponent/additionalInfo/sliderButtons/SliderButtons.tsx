import { ArrowIcon } from "../../../shared/icons"

export const SliderButtons = () => {
  return (
    <>
      <button className="swiper-button-prev swiper__button-prev">
        <ArrowIcon />
      </button>
      <button className="swiper-button-next swiper__button-next">
        <ArrowIcon />
      </button>
    </>
  )
}