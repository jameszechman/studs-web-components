'use client';

import React from 'react';
import Link from 'next/link';
import { StudsButton } from '@studs/react';

export type Props = {
  label?: string
  buttonType?: 'primary' | 'secondary' | 'tertiary' | 'cta' | 'link' | 'floating' | 'icon' | 'close'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button' | 'reset'
  disabled?: boolean,
  icon?: string,
  iconPosition?: 'start' | 'end',
  contentDirection?: 'block' | 'inline',
  size?: 'small' | 'medium' | 'large',
}

export const Button: React.FC<Props> = ({
                                          el: elFromProps = 'link',
                                          label,
                                          newTab,
                                          href,
                                          buttonType,
                                          className: classNameFromProps,
                                          onClick,
                                          type = 'button',
                                          disabled,
  icon,
  iconPosition,
  contentDirection,
  size = 'medium',
                                        }) => {

  let el = elFromProps;

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  if (onClick || type === 'submit') el = 'button';
  const elProperties = {
    type,
    buttonType,
    disabled,
    icon,
    iconPosition,
    contentDirection,
    size,
  };

    if (el === 'link') {
      return (
        <Link href={href || ''} {...newTabProps} onClick={onClick}>
          <StudsButton {...elProperties}>
            {label}
          </StudsButton>
        </Link>
      );
    }

    if (el === 'a') {
      return (
        <a href={href || ''} {...newTabProps} onClick={onClick}>
          <StudsButton {...elProperties}>
            {label}
          </StudsButton>
        </a>
      );
    }

    return (
      <StudsButton
        {...elProperties}
        onClick={onClick}
      >
        {label}
      </StudsButton>
    );
};
