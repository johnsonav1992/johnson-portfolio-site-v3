import type { Handle, MixInput } from 'remix/ui'

interface ExternalLinkIconProps {
  'aria-hidden'?: boolean | 'false' | 'true'
  'aria-label'?: string
  'aria-labelledby'?: string
  mix?: MixInput<SVGSVGElement>
}

export const ExternalLinkIcon = (handle: Handle<ExternalLinkIconProps>) => {
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
        <title>Open link</title>
        <path
          d='M6.25 4H4.5A1.5 1.5 0 0 0 3 5.5v6A1.5 1.5 0 0 0 4.5 13h6A1.5 1.5 0 0 0 12 11.5V9.75'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='M8 3h5v5'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
        />
        <path
          d='m13 3-6.25 6.25'
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
