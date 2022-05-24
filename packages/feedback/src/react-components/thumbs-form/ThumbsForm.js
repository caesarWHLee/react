import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';

import ThumbField from './ThumbField';

const Form = styled.form``

const Field = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.p`
  font-size: 18px;
  line-height: 27px;
  margin: 0;
`

const ThumbWrapper = styled.div`
  margin-top: 20px;
  display: flex;
`


export default function ThumbsForm({ onSubmit, thumbsFields }) {
  const [thumbUpChecked, setThumbUpChecked] = useState(false)
  const [thumbDownChecked, setThumbDownChecked] = useState(false)
  const [thumbUpPressing, setThumbUpPressing] = useState(false)
  const [thumbDownPressing, setThumbDownPressing] = useState(false)
  const timerRef = useRef(null)
  const initialMounted = useRef(true)

  useEffect(() => {
    if (initialMounted.current) {
      initialMounted.current = !initialMounted.current
      return
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      let thumbValue = null
      if (thumbUpChecked) {
        thumbValue = true
      }
      if (thumbDownChecked) {
        thumbValue = false
      }
      console.log('start sending request!', thumbValue)
      onSubmit(thumbValue)
      timerRef.current = null;
    }, 1000)

  }, [thumbUpChecked, thumbDownChecked])

  const thumbUpRadioClicked = () => {
    setThumbUpPressing(false)
    setThumbUpChecked((thumbUpChecked) => {
      if (thumbUpChecked) {
        return false
      } else {
        setThumbDownChecked(false)
        return true
      }
    })
  }

  const thumbDownRadioClicked = () => {
    setThumbDownPressing(false)
    setThumbDownChecked((thumbDownChecked) => {
      if (thumbDownChecked) {
        return false
      } else {
        setThumbUpChecked(false)
        return true
      }
    })
  }

  const thumbUpProps = {
    thumbsUp: true,
    onMouseDown: () => setThumbUpPressing(true),
    onMouseUp: thumbUpRadioClicked,
    checked: thumbUpChecked,
    pressing: thumbUpPressing,
    label: '符合',
    statistic: 128,
  }

  const thumbDownProps = {
    thumbsUp: false,
    onMouseDown: () => setThumbDownPressing(true),
    onMouseUp: thumbDownRadioClicked,
    checked: thumbDownChecked,
    pressing: thumbDownPressing,
    label: '不符合',
    statistic: 9,
  }


  return (<>
    <Form>
      {
        thumbsFields.map(thumbsField => (
          <Field key={Math.random()}>
            <Title>{thumbsField.name}</Title>
            <ThumbWrapper>
              <ThumbField {...thumbUpProps} />
              <ThumbField {...thumbDownProps} />
            </ThumbWrapper>
          </Field>
        ))
      }
    </Form>
  </>)
}