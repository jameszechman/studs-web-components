export const VERSION = `
  id
  version
`

export const VERSIONS = `
  query versions {
    Versions {
      docs {
        ${VERSION}
      }
    }
  }
`
