import { FC, PropsWithChildren } from "react";
import css from "./container.module.scss";
import classNames from "classnames";

interface Props {
    className?: string;
}

export const Container: FC<PropsWithChildren<Props>> =
    ({
         className,
         children
     }) => {
        return (
            <div className={classNames(css.root, className)}>
                <div className={css.container}>
                    {children}
                </div>
            </div>
        )
    };