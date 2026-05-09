import { css, type Handle } from 'remix/ui'

import { theme } from '../../../../theme/styles.ts'

export const TagList = (handle: Handle<{ values: string[] }>) => {
  return () => {
    const { values } = handle.props

    return (
      <ul
        mix={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: theme.space.sm,
          listStyle: 'none',
          margin: 0,
          padding: 0,
        })}
      >
        {values.map((value) => (
          <li
            key={value}
            mix={css({
              minHeight: '30px',
              display: 'inline-flex',
              alignItems: 'center',
              padding: `0 ${theme.space.md}`,
              borderRadius: theme.radius.full,
              border: `1px solid ${theme.colors.border.subtle}`,
              color: theme.colors.text.secondary,
              background: 'rgb(255 255 255 / 0.035)',
              fontSize: theme.fontSize.sm,
            })}
          >
            {value}
          </li>
        ))}
      </ul>
    )
  }
}
