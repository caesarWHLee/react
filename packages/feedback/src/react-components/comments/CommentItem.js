import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import CommentSvg from '../../static/icon-comment.svg'
import CommentStrongSvg from '../../static/icon-comment-strong.svg'


const SVGWrapper = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  .normal {
    display: none;
  }
  .strong {
    display: none;
  }
  @media (max-width: 1200px) {
    .normal {
      display: block;
    }
  }
`

const Wrapper = styled.button`
  background-color: #fff;
  border: none;
  border-radius: 6px;
  padding: 16px 24px;
  font: inherit;
  outline: inherit;
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    @media (min-width: 1201px) {
      .normal {
        display: block;
      }  
    }
  }

  &:active {
    .normal {
      display: none;
    }
    .strong {
      display: block;
    }
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

const Date = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: rgba(0, 9, 40, 30%)
`

const Content = styled.div`
  white-space: pre-line;
  color: rgba(0, 9, 40, 87%);
  font-size: 18px;
  line-height: 36px;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 32px;
  }
  ${({ contentTooLong, contentExpand }) =>
    (contentTooLong && !contentExpand) ? `
      max-height: 216px;
      @media (max-width: 768px) {
        max-height: 96px;
      }
    ` : ''
  }

`

const Hint = styled.div`
  color: rgba(0, 9, 40, 30%);
  font-size: 18px;
  line-height: 36px;
`

export default function CommentItem({ comment }) {
  const [contentExpand, setContentExpand] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPressing, setIsPressing] = useState(false)
  const [contentTooLong, setContentTooLong] = useState(false)
  const contentRef = useRef()

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    const limit = isMobile ? 96 : 216
    if (contentRef.current) {
      const height = contentRef.current.clientHeight
      if (height > limit) {
        console.log('tooo long')
        setContentTooLong(true)
      }
    }
  }, [])

  const feedbackClickedHandler = (e) => {
    console.log('end of pressing')
    setIsPressing(false)
    e.target.blur()

    if (contentTooLong) {
      setContentExpand((contentExpand) => !contentExpand)
    }
  }

  // PC
  // { isPressing ? <CommentStrongSvg /> : (isHovering ? <CommentSvg /> : null) }
  // Mobile
  // isPressing ? <CommentStrongSvg /> : <CommentSvg />

  return <Wrapper contentExpand={contentExpand} onMouseOver={() => { console.log('onMouseOver'); setIsHovering(true) }} onMouseOut={() => { console.log('onMouseOut'); setIsHovering(false) }} onMouseDown={() => { console.log('onMouseDown'); setIsPressing(true) }} onMouseUp={feedbackClickedHandler}>
    <Header>
      <Date>{comment.date}</Date>
      <SVGWrapper>
        < CommentStrongSvg className="strong" />
        <CommentSvg className="normal" />
      </SVGWrapper>
    </Header>
    <Content contentTooLong={contentTooLong} contentExpand={contentExpand} ref={contentRef} >{comment.content}</Content>
    {contentTooLong && !contentExpand && <Hint>展開全部</Hint>}
  </Wrapper >
}