import { ComponentPropsWithoutRef } from 'react'

import { tv, SlotsToClasses } from '@nextui-org/react'

const divider = tv({
  base: 'flex w-full items-center',
  slots: {
    hr: 'my-4 h-divider shrink-0 grow border-none bg-divider'
  }
})

interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  text?: string
  classNames?: SlotsToClasses<keyof ReturnType<typeof divider>>
}

export function Divider({ text, classNames, className, ...rest }: DividerProps) {
  const { base, hr } = divider()

  return (
    <div className={base({ className: classNames?.base || className })}>
      <hr className={hr({ className: classNames?.hr })} {...rest} />
      {text && <p className="mx-4">{text}</p>}
      <hr className={hr({ className: classNames?.hr })} {...rest} />
    </div>
  )
}
