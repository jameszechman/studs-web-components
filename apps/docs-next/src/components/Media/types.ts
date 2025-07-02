import type { Media as MediaType } from '@studs/cms'

export interface Props {
  class?: string
  src?: string // for static media
  alt?: string
  resource?: MediaType // for Payload media
  size?: string // for NextImage only 
}
