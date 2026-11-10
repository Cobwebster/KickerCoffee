declare module 'react-simple-maps' {
  import type { ComponentType, CSSProperties, ReactNode, SVGProps } from 'react'

  export type ProjectionConfig = {
    scale?: number
    center?: [number, number]
    rotate?: [number, number, number]
  }

  export type GeographyType = {
    id?: string | number
    rsmKey: string
    svgPath: string
    properties?: Record<string, unknown>
  }

  export const ComposableMap: ComponentType<{
    projection?: string
    projectionConfig?: ProjectionConfig
    width?: number
    height?: number
    style?: CSSProperties
    className?: string
    children?: ReactNode
  }>

  export const ZoomableGroup: ComponentType<{
    zoom?: number
    center?: [number, number]
    minZoom?: number
    maxZoom?: number
    translateExtent?: [[number, number], [number, number]]
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void
    children?: ReactNode
  }>

  export const Geographies: ComponentType<{
    geography: string | object
    children: (data: { geographies: GeographyType[] }) => ReactNode
  }>

  export const Geography: ComponentType<
    {
      geography: GeographyType
      style?: {
        default?: CSSProperties
        hover?: CSSProperties
        pressed?: CSSProperties
      }
    } & SVGProps<SVGPathElement>
  >

  export const Marker: ComponentType<
    {
      coordinates: [number, number]
      children?: ReactNode
    } & SVGProps<SVGGElement>
  >
}
