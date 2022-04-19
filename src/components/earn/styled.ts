import styled from 'styled-components'
import { AutoColumn } from '../Column'

export const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 6px;
  width: fit-content;
  justify-self: flex-end;
`

export const DataCard = styled(AutoColumn)<{ disabled?: boolean }>`
  background: -moz-linear-gradient(-45deg,  rgba(166,125,63,0) 0%, rgba(166,125,63,0.7) 50%, rgba(166,125,63,1) 97%, rgba(166,125,63,1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(-45deg,  rgba(166,125,63,0) 0%,rgba(166,125,63,0.7) 50%,rgba(166,125,63,1) 97%,rgba(166,125,63,1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(135deg,  rgba(166,125,63,0) 0%,rgba(166,125,63,0.7) 50%,rgba(166,125,63,1) 97%,rgba(166,125,63,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a67d3f', endColorstr='#a67d3f',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

  border-radius: 6px;
  width: 100%;
  position: relative;
  overflow: hidden;
`

export const CardBGImage = styled.span<{ desaturate?: boolean }>`
  width: 1000px;
  height: 600px;
  position: absolute;
  border-radius: 6px;
  opacity: 0.4;
  top: -100px;
  left: -100px;
  transform: rotate(-15deg);
  user-select: none;

  ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`

export const CardBGImageSmaller = styled.span<{ desaturate?: boolean }>`
  width: 1200px;
  height: 1200px;
  position: absolute;
  border-radius: 6px;
  top: -300px;
  left: -300px;
  opacity: 0.4;
  user-select: none;

  ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`

export const CardNoise = styled.span`
  background-size: cover;
  mix-blend-mode: overlay;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  opacity: 0.15;
  position: absolute;
  top: 0;
  left: 0;
  user-select: none;
`

export const CardSection = styled(AutoColumn)<{ disabled?: boolean }>`
  padding: 1rem;
  z-index: 1;
  opacity: ${({ disabled }) => disabled && '0.4'};
`

export const Break = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  height: 1px;
`
