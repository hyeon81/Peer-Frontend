import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import * as style from './TeamName.style'

interface IteamNameProps {
  teamName: string
}
const TeamName = ({ teamName }: IteamNameProps) => {
  return (
    <Stack sx={style.teamNameBox}>
      <Avatar src={''} sx={style.avatarImage} />
      <Typography variant={'Body2'} color={'text.normal'} sx={style.teamName}>
        {teamName}
      </Typography>
    </Stack>
  )
}

export default TeamName
