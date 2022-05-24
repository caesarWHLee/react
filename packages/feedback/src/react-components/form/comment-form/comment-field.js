import React, { useState } from 'react'
import styled from 'styled-components'

import Comments from '../comments/comments'
import Textarea from './texarea'
import useComments from '../../hooks/use-comments'

const Wrapper = styled.div`
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


export default function CommentField({ field, verified }) {
  const [enableSumbit, setEnableSubmit] = useState(false)
  const [textareaValue, setTextareaValue] = useState('')
  const { comments, noMoreComment, loadMoreComments, postComment } = useComments()
  console.log(`show comments count: ${comments.length}`)

  const textareaChangedHandler = (e) => {
    const value = e.target.value
    setEnableSubmit(!!value)
    setTextareaValue(value)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!textareaValue.trim()) {
      return
    }
    console.log(textareaValue)
    await postComment(textareaValue)

    setTextareaValue('')
    setEnableSubmit(false)
  }

  return (
    <Wrapper>
      {verified && (<>
        <Textarea textAreaValue={textareaValue} onChange={textareaChangedHandler} />
        <ButtonWrapper>
          <Button disabled={!enableSumbit} onClick={submitHandler}>送出</Button>
        </ButtonWrapper>
      </>)}
      <Comments comments={comments} onExpand={loadMoreComments} noMoreComment={noMoreComment} />
    </Wrapper>
  )
}