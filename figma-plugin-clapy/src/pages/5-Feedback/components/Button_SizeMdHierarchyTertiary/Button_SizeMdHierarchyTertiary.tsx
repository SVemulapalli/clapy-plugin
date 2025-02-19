import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import { _ButtonBase_SizeMdIconOnly } from '../_ButtonBase_SizeMdIconOnly/_ButtonBase_SizeMdIconOnly';
import classes from './Button_SizeMdHierarchyTertiary.module.css';
import { CircleIcon } from './CircleIcon';

interface Props {
  className?: string;
  swap?: {
    circle?: ReactNode;
  };
}
/* @figmaId 1899:113261 */
export const Button_SizeMdHierarchyTertiary: FC<Props> = memo(function Button_SizeMdHierarchyTertiary(props = {}) {
  return (
    <button className={classes.root}>
      <_ButtonBase_SizeMdIconOnly
        className={classes._ButtonBase}
        swap={{
          icon: <CircleIcon className={classes.icon} />,
          circle: props.swap?.circle,
        }}
      />
    </button>
  );
});
