import React from 'react';

export const Avatar = props => {
  const src = props.src && typeof props.src === 'object' ? URL.createObjectURL(props.src) : props.src;

  return props.src ? <img src={src} height={props.height || '100px'} width={props.width || '100px'} className="rounded-img"/> : null;
}