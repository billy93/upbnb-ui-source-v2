import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#a67d3f+0,a67d3f+100&0+0,1+100,1+100 */
background: -moz-linear-gradient(-45deg,  rgba(166,125,63,0) 0%, rgba(166,125,63,1) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(-45deg,  rgba(166,125,63,0) 0%,rgba(166,125,63,1) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(135deg,  rgba(166,125,63,0) 0%,rgba(166,125,63,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a67d3f', endColorstr='#a67d3f',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
border-radius: 6px;
  /* padding: 1rem; */
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
