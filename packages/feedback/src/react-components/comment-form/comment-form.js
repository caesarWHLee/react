import React, { useState } from 'react';
import styled from 'styled-components';

import Textarea from './texarea'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
`

const Button = styled.button`
  margin-top: 12px;
  width: 120px;
  background-color: #04295E;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 12px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 18px;
  line-height: 27px;

  &:hover, &:focus {
    background-color: #000928;
  }
  &:disabled {
    background-color: #e0e0e0;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`


export default function TextareaForm({ onSubmit }) {
  const [enableSumbit, setEnableSubmit] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')

  const textareaChangedHandler = (e) => {
    const value = e.target.value
    setEnableSubmit(!!value)
    setTextareaValue(value)
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!textareaValue.trim()) {
      return
    }
    console.log(textareaValue)
    await onSubmit(textareaValue)

    setTextareaValue('')
    setEnableSubmit(false)
  }
  return (
    <Form onSubmit={submitHandler}>
      <Textarea textAreaValue={textareaValue} onChange={textareaChangedHandler} />
      <ButtonWrapper>
        <Button disabled={!enableSumbit}>送出</Button>
      </ButtonWrapper>
    </Form>
  )
}