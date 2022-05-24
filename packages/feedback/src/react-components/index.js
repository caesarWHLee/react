import React, { useState, useEffect, useRef } from 'react'

import Section from './layout/Section'
import ThumbsForm from './thumbs-form/ThumbsForm'
import CommentForm from './comment-form/CommentForm'
import useRecaptcha from './hooks/useRecaptcha'
import Comments from './comments/Comments'
import useComments from './hooks/useComments';
import useThumbsUp from './hooks/useThumbsUp'


export default function Feedback() {
  const { verified } = useRecaptcha()
  const { comments, noMoreComment, loadMoreComments, postComment } = useComments()
  const { thumbsUp, giveThumbUp } = useThumbsUp()
  console.log(`show comments count: ${comments.length}`)

  return (
    <>
      <Section>
        <ThumbsForm onSubmit={giveThumbUp} thumbs={thumbsUp} />
        {verified && <CommentForm onSubmit={postComment} />}
      </Section>
      <Section>
        <Comments comments={comments} onExpand={loadMoreComments} noMoreComment={noMoreComment} />
      </Section>
    </>
  )
}