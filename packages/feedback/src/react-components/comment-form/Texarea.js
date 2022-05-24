import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
`

const Textarea = styled.textarea`
  width: 100%;
  height: 159px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  resize: none;
  outline: none;
  box-sizing: border-box;
  vertical-align: top;
  overflow: auto;
`

export default function CustomTextarea(props) {
  return <Wrapper>
    <Textarea placeholder="跟大家分享你的經驗..." name="feedback-post" onChange={props.onChange} value={props.textAreaValue} />
  </Wrapper>
}