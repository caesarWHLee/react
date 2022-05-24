import React, { useState, useEffect, useRef } from 'react'

import useUser from './useUser';
import { getLikes, giveLikes } from '../api'

export default function useThumbsUp() {
  const [thumbsUp, setThumbsUp] = useState(null)
  const originalThumbUpRef = useRef(null)
  const { userId } = useUser()

  const giveThumbUp = async (thumbUp) => {
    console.log(`send thumbUp '${thumbUp}' to BE`);
    // add thumbUp statistic before sending request
    const originalThumbUp = originalThumbUpRef.current
    console.log(originalThumbUp)
    if (thumbUp) {
      setThumbsUp({
        thumbUp: originalThumbUp.thumbUp + 1,
        thumbDown: originalThumbUp.thumbDown,
      })
    } else if (thumbUp === false) {
      setThumbsUp({
        thumbUp: originalThumbUp.thumbUp,
        thumbDown: originalThumbUp.thumbDown + 1,
      })
    } else {
      setThumbsUp(originalThumbUpRef.current)
    }
    // send request without error handle
    try {
      const result = await giveLikes({
        name: userId,
        form: "2",
        responseTime: new Date,
        field: "6",
        userFeedback: thumbUp
      })
      console.log('result', result)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    const getThumbsUp = async () => {
      try {
        const result = await getLikes()
        if (result?.data) {
          const { like, dislike } = result.data
          const thumbsValue = { thumbUp: like, thumbDown: dislike }
          originalThumbUpRef.current = thumbsValue
          setThumbsUp(thumbsValue)
        } else {
          console.log('respond not as expected', result)
        }
      } catch (error) {
        console.log('error', error)
      }
    }
    getThumbsUp()
  }, [])

  return {
    thumbsUp,
    giveThumbUp
  }
}