import { useEffect, useState } from 'react';
import css from './mobileTitle.module.scss';

type Props = {
  pointTitle: string;
};

export const MobileTitle = ({ pointTitle }: Props) => {
  const [displayedTitle, setDisplayedTitle] = useState(pointTitle);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);

    const timer1 = setTimeout(() => {
      setDisplayedTitle(pointTitle);
      setIsVisible(true);
    }, 400);

    return () => clearTimeout(timer1);
  }, [pointTitle]);

  return (
    <div className={`${css.title} ${isVisible ? css.fadeIn : css.fadeOut}`}>
      {displayedTitle}
    </div>
  );
};