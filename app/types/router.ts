import type { ContextWithEntry, RequestContext } from 'remix/fetch-router'

export type AppRequestContext = ContextWithEntry<
  RequestContext,
  { key: typeof FormData; value: FormData; property: 'formData' }
>
