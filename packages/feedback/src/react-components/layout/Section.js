import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 0 auto;
  width: 600px;
  font-family: 'Noto Sans TC', sans-serif;

  @media (max-width: 768px) {
    width: auto;
    margin: 0 20px;
  }
`

export default function Section(props) {
  return <Wrapper>{props.children}</Wrapper>
}