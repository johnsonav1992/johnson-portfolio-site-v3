import type { Handle, MixInput } from 'remix/ui'

interface ChevronRightIconProps {
  'aria-hidden'?: boolean | 'false' | 'true'
  'aria-label'?: string
  'aria-labelledby'?: string
  mix?: MixInput<SVGSVGElement>
}

export const ChevronRightIcon = (handle: Handle<ChevronRightIconProps>) => {
  return () => {
    const { mix, ...props } = handle.props
    const hiddenByDefault =
      props['aria-hidden'] === undefined &&
      props['aria-label'] === undefined &&
      props['aria-labelledby'] === undefined

    return (
      <svg
        {...props}
        aria-hidden={hiddenByDefault ? true : props['aria-hidden']}
        fill='none'
        viewBox='0 0 16 16'
        xmlns='http://www.w3.org/2000/svg'
        mix={mix}
      >
        <title>Next</title>
        <path
          d='m6 4 4 4-4 4'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
      </svg>
    )
  }
}
