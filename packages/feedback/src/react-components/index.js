import React, { useState, useEffect, useRef } from 'react'

import Section from './layout/Section'
import ThumbsForm from './thumbs-form/ThumbsForm'
import CommentForm from './comment-form/CommentForm'
import useRecaptcha from './hooks/useRecaptcha'
import Comments from './comments/Comments'
import useComments from './hooks/useComments';
import { getThumbUps } from './api'


export default function Feedback() {
  const [thumbsValue, setThumbsValue] = useState(null)

  const { verified } = useRecaptcha()
  const { comments, noMoreComment, loadMoreComments, postComment } = useComments()
  console.log(`show comments count: ${comments.length}`)

  useEffect(() => {
    const fetchThumbUpData = async () => {
      try {
        const result = await getThumbUps()
        if (result?.data) {
          const { like, dislike } = result.data
          const thumbsValue = { thumbUp: like, thumbDown: dislike }
          setThumbsValue(thumbsValue)
        } else {
          console.log('respond not as expected', result)
        }
      } catch (error) {
        console.log('error', error)
      }
    }

    fetchThumbUpData()
  }, [])



  const thumbsFormSubmitHandler = (thumbValue) => {
    console.log(`send thumbValue '${thumbValue}' to BE`);
    return true
  }

  return (
    <>
      <Section>
        <ThumbsForm onSubmit={thumbsFormSubmitHandler} thumbs={thumbsValue} />
        {verified && <CommentForm onSubmit={postComment} />}
      </Section>
      <Section>
        <Comments comments={comments} onExpand={loadMoreComments} noMoreComment={noMoreComment} />
      </Section>
    </>
  )
}