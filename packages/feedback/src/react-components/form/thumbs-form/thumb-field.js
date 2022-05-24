import React from 'react'
import styled from 'styled-components'

import ThumbUpSvg from '../../../static/icon-thumb-up.svg'
import ThumbUpActiveSvg from '../../../static/icon-thumb-up-active.svg'
import ThumbDownSvg from '../../../static/icon-thumb-down.svg'
import ThumbDownActiveSvg from '../../../static/icon-thumb-down-active.svg'


const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  &:last-child {
    margin-left: 40px;
  }
`

// able to uncheck radio button
const ThumbMockLabel = styled.div`
  position: relative;
  padding-top: 60px;
  font-size: 18px;
  line-height: 27px;
`

const ThumbIconWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: calc((100% - 56px) /2);
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  cursor: pointer;

  &:hover, &:active {
    border-color: #000928;
  }
  &:active {
    background-color: #edeff2;
  }
`

const Input = styled.input`
  display: none;

  &:checked ~ ${ThumbIconWrapper} {
    border-color: #04295e;
  }
`

const ThumbStatistic = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: rgba(0, 9, 40, 30%);
`

export default function ThumbField({ thumbsUp, onMouseDown, onMouseUp, checked, pressing, label, statistic }) {
  const ThumbSVG = thumbsUp ? <ThumbUpSvg /> : <ThumbDownSvg />
  const ThumbActiveSVG = thumbsUp ? <ThumbUpActiveSvg /> : <ThumbDownActiveSvg />
  return (
    <Wrapper>
      <ThumbMockLabel onMouseDown={onMouseDown} onMouseUp={onMouseUp}>{label}
        <Input type="radio" name="thumbs" onChange={() => { }} checked={checked} />
        <ThumbIconWrapper>
          {pressing || checked ? ThumbActiveSVG : ThumbSVG}
        </ThumbIconWrapper>
      </ThumbMockLabel>
      {statistic !== null && <ThumbStatistic>{statistic}</ThumbStatistic>}
    </Wrapper>
  )
}