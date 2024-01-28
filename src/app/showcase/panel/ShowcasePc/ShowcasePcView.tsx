'use client'

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import { ICardData } from '../types'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { CalendarIcon, TagIcon, ThreeDotsIcon } from '../icons'
import { MouseEvent, useCallback, useState } from 'react'
import useAxiosWithAuth from '@/api/config'
import TagChip from '@/components/TagChip'
import { useRouter } from 'next/navigation'

function leftPad(value: number) {
  if (value >= 10) {
    return value
  }

  return `0${value}`
}

function toStringByFormatting(source: Date, delimiter = '-') {
  const year = source.getFullYear()
  const month = leftPad(source.getMonth() + 1)
  const day = leftPad(source.getDate())

  return [year, month, day].join(delimiter)
}

const ShowcasePcView = ({ data }: { data: ICardData | undefined }) => {
  const router = useRouter()
  const [isTouched, setIsTouched] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const axiosWithAuth = useAxiosWithAuth()
  const handleCardClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setIsTouched(!isTouched)
  }

  const clickLike = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/like/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          if (data.like < res.data.like) {
            data.liked = true
          } else {
            data.liked = false
          }
          data.like = res.data.like
        }
      })
  }, [data, axiosWithAuth])

  const clickFavorite = useCallback(() => {
    if (!data) return alert('로그인이 필요합니다.')
    if (data.favorite) return alert('이미 관심을 추가한 팀입니다.')
    axiosWithAuth
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/showcase/favorite/${data.id}`,
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res)
          data.favorite = true
        }
      })
  }, [data, axiosWithAuth])

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <Stack direction={'row'} spacing={10}>
      <Card
        sx={{
          height: '37rem',
          backgroundColor: 'background.tertiary',
          width: '25rem',
        }}
      >
        {data !== undefined ? (
          <CardActions onClick={handleCardClick}>
            <CardContent>
              <Stack spacing={'1.5rem'}>
                <Stack
                  direction={'row'}
                  height={'1.5rem'}
                  justifyContent={'space-between'}
                >
                  <Stack direction={'row'} spacing={'0.5rem'}>
                    <Avatar
                      src={data.image!}
                      sx={{ width: '1.5rem', height: '1.5rem' }}
                    />
                    <Typography color={'text.alternative'} width={'11rem'}>
                      {data.name}
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={'1rem'}>
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <IconButton
                        onClick={clickLike}
                        color={data.liked ? 'primary' : 'inherit'}
                        size="small"
                        sx={{
                          m: 0,
                          p: 0,
                        }}
                      >
                        <ThumbUpIcon />
                      </IconButton>
                      <Typography>{data.like}</Typography>
                    </Stack>

                    <IconButton
                      onClick={clickFavorite}
                      color={data.favorite ? 'primary' : 'inherit'}
                      size="small"
                      sx={{
                        m: 0,
                        p: 0,
                      }}
                    >
                      <FavoriteIcon />
                    </IconButton>

                    <IconButton
                      color="inherit"
                      sx={{
                        m: 0,
                        p: 0,
                      }}
                      onClick={handleMenuOpen}
                    >
                      <ThreeDotsIcon />
                    </IconButton>
                    <Menu
                      open={open}
                      onClose={handleMenuClose}
                      anchorEl={anchorEl}
                    >
                      <MenuItem>공유</MenuItem>
                      <MenuItem>신고</MenuItem>
                    </Menu>
                  </Stack>
                </Stack>
                <Stack
                  height={'20rem'}
                  width={'22rem'}
                  whiteSpace={'normal'}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                >
                  <Typography sx={{ wordBreak: 'break-word' }}>
                    {data.description}
                  </Typography>
                </Stack>
                <Stack alignItems={'center'}>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{ width: 'fit-content' }}
                    onClick={() => router.push(`/showcase/${data.id}`)}
                  >
                    <Typography noWrap variant="caption">
                      전체 글 보기
                    </Typography>
                  </Button>
                </Stack>
                <Stack spacing={'0.25rem'}>
                  <Stack
                    direction={'row'}
                    spacing={'1rem'}
                    textAlign={'center'}
                  >
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <CalendarIcon />
                      <Typography color={'text.alternative'}>시작일</Typography>
                      <Typography>
                        {toStringByFormatting(new Date(data.start))}
                      </Typography>
                    </Stack>
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <CalendarIcon />
                      <Typography color={'text.alternative'}>종료일</Typography>
                      <Typography>
                        {toStringByFormatting(new Date(data.end))}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack
                    direction={'row'}
                    spacing={'1rem'}
                    textAlign={'center'}
                  >
                    <Stack direction={'row'} spacing={'0.5rem'}>
                      <TagIcon />
                      <Typography color={'text.alternative'}>
                        기술스택
                      </Typography>
                    </Stack>
                    {data.skill.map((skill, index) => (
                      <TagChip
                        key={index}
                        name={skill.name}
                        color={skill.color}
                      />
                    ))}
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </CardActions>
        ) : (
          <Typography>데이터가 없습니다.</Typography>
        )}
      </Card>
    </Stack>
  )
}

export default ShowcasePcView