import { Title } from "./title"
import css from "./mainComponent.module.scss"
import { AdditionalInfo } from "./additionalInfo"
import { useState } from "react"
import { RangeInfo } from "./rangeInfo"

export const MainComponent = () => {
  const [selectedDate, setSelectedDate] = useState("1987-1991");

  return (
    <div className={css.wrapper}>
      <Title/>

      <RangeInfo selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

      <AdditionalInfo selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>

      <div className={css.aim__overlay}></div>
    </div>
  )
}