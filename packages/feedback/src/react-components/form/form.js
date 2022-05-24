import React from 'react'
import styled from 'styled-components';

import ThumbsField from './thumbs-form/thumbs-field';
import CommentField from './comment-form/comment-field';

const FormWrapper = styled.form`
  margin: 0 auto;
  width: 600px;
  font-family: 'Noto Sans TC', sans-serif;

  @media (max-width: 768px) {
    width: auto;
    margin: 0 20px;
  }
`

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`

export default function CustomForm({ form, verified }) {

  return (
    <FormWrapper>
      {form.fields.map((field) => {
        switch (field.type) {
          case 'text':
            return <CommentField key={field.id} field={field} verified={verified} />
          case 'single':
            return <ThumbsField key={field.id} field={field} />
          default:
            return (<FieldWrapper key={field.id}></FieldWrapper>)
        }
      })}
    </FormWrapper>
  )
}