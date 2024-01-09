'use client'
import { defaultGetFetcher } from '@/api/fetchers'
import CuToggle from '@/components/CuToggle'
import PostCard from '@/components/PostCard'
import TitleBox from '@/components/TitleBox'
import useInfiniteScroll from '@/hook/useInfiniteScroll'
import { IPagination } from '@/types/IPagination'
import { IMainCard } from '@/types/IPostDetail'
import {
  Box,
  CircularProgress,
  FormControlLabel,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import * as style from './Profile.style'
import useMedia from '@/hook/useMedia'

const MyPortfolio = () => {
  const [page, setPage] = useState<number>(1)
  const [postList, setPostList] = useState<Array<IMainCard>>([])
  const [pageLimit, setPageLimit] = useState(1)
  const { isPc } = useMedia()

  const {
    data,
    isLoading,
    // error,
    mutate,
  } = useSWR<IPagination<Array<IMainCard>>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/recruit?type=PROJECT&sort=latest&page=${page}&pageSize=5&keyword=&due=1개월&due=12개월 이상&region1=&region2=&place=&status=&tag=`,
    defaultGetFetcher,
  )

  useEffect(() => {
    if (!isLoading && data && !data.last) {
      setPostList((prev) => prev.concat(data.content))
      if (data?.content.length === 5) {
        setPageLimit((prev) => prev + 1)
      }
    }
  }, [isLoading, data])

  const { target, spinner } = useInfiniteScroll({
    setPage,
    mutate,
    pageLimit,
    page,
  })

  const DisclosureToggle = () => {
    return (
      <FormControlLabel
        control={<CuToggle />}
        label={
          <Typography variant="CaptionEmphasis" color={'text.assistive'}>
            공개 여부
          </Typography>
        }
        labelPlacement="start"
        onClick={() => {
          console.log('공개 여부')
        }}
        sx={{ margin: 0 }}
      />
    )
  }

  return (
    <TitleBox
      title="내 작업물"
      titleEndAdornment={<DisclosureToggle />}
      titleBoxSx={isPc ? style.myPortfolioPcStyle : undefined}
      titleContainerSx={{
        px: isPc ? '0.5rem' : 0,
        width: '100%',
        boxSizing: 'border-box',
      }}
      titleBoxSpacing={isPc ? '0.75rem' : '0.5rem'}
    >
      <Grid container rowSpacing={[2, 3]} columnSpacing={[0, 2]} columns={12}>
        {postList.map((post) => (
          <Grid xs={12} sm={6} key={post.recruit_id}>
            <PostCard
              authorImage={post.user_thumbnail}
              title={post.title}
              tagList={post.tagList}
              image={post.image}
              teamName={post.user_nickname}
              postId={post.recruit_id}
            />
          </Grid>
        ))}
        <Grid xs={12} sm={6}>
          <Box position={'relative'} ref={target}>
            {spinner && <CircularProgress />}
          </Box>
        </Grid>
      </Grid>
    </TitleBox>
  )
}

export default MyPortfolio
