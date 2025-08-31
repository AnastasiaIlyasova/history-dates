import css from "./rangeDates.module.scss"

type Props = {
  animatedRange: { start: number; end: number; };
}

export const RangeDates = ({ animatedRange }: Props) => {
  return (
    <div className={css.title}>
      <span className={css.title__start}>
        {animatedRange.start}&nbsp;&nbsp;
      </span>

      <span className={css.title__end}>
        {animatedRange.end}
      </span>
    </div>
  )
}