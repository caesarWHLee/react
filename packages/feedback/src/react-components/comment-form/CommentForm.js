import React, { useState } from 'react';
import styled from 'styled-components';

import Textarea from './Texarea'

const Form = styled.form``

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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


export default function TextareaForm({ onSubmit, commentFields }) {
  const [enableSumbit, setEnableSubmit] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')

  const textareaChangedHandler = (e) => {
    const value = e.target.value
    setEnableSubmit(!!value)
    setTextareaValue(value)
  }
  const submitHandler = (e) => {
    e.preventDefault();

    if (!textareaValue.trim()) {
      return
    }
    console.log(textareaValue)

    const successful = onSubmit(textareaValue)
    if (successful) {
      setTextareaValue('')
      setEnableSubmit(false)
    }
  }
  return (
    <Form onSubmit={submitHandler}>
      {commentFields.map(commentField => (
        <Field key={commentField.id}>
          <Textarea textAreaValue={textareaValue} onChange={textareaChangedHandler} placeholder={commentField.name} />
          <ButtonWrapper>
            <Button disabled={!enableSumbit}>送出</Button>
          </ButtonWrapper>
        </Field>
      ))}
    </Form>
  )
}