import '@total-typescript/ts-reset/dom'

declare module '*.css?url' {
  const content: any
  export default content
}

declare module '*.svg?react' {
  const content: any
  export default content
}
