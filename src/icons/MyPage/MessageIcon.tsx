import { SvgIcon, SvgIconProps } from '@mui/material'

const MessageIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.7032 0.7325C-7.15256e-08 1.46438 0 2.64313 0 5C0 7.35687 -7.15256e-08 8.53562 0.7032 9.2675C1.4058 10 2.5374 10 4.8 10H7.2C9.4626 10 10.5942 10 11.2968 9.2675C12 8.53562 12 7.35687 12 5C12 2.64313 12 1.46438 11.2968 0.7325C10.5942 -7.45058e-08 9.4626 0 7.2 0H4.8C2.5374 0 1.4058 -7.45058e-08 0.7032 0.7325ZM9.9456 2.2C10.0219 2.29549 10.0588 2.41866 10.048 2.54242C10.0372 2.66618 9.97963 2.78041 9.888 2.86L8.5704 4.00375C8.0382 4.46625 7.6074 4.84 7.2264 5.095C6.8304 5.36063 6.4446 5.52813 6 5.52813C5.5554 5.52813 5.1696 5.36 4.773 5.095C4.3926 4.84 3.9618 4.46562 3.4296 4.00437L2.112 2.86062C2.02026 2.78106 1.96262 2.66679 1.95177 2.54296C1.94091 2.41913 1.97772 2.29587 2.0541 2.20031C2.13048 2.10475 2.24018 2.04471 2.35906 2.0334C2.47794 2.02209 2.59626 2.06043 2.688 2.14L3.984 3.26437C4.5438 3.75 4.932 4.08625 5.2608 4.30625C5.5782 4.51875 5.7936 4.59063 6.0006 4.59063C6.2076 4.59063 6.423 4.51938 6.7404 4.30625C7.0686 4.08625 7.4574 3.75 8.0172 3.26437L9.3126 2.13937C9.40435 2.05992 9.52264 2.02167 9.64145 2.03304C9.76027 2.0444 9.86928 2.10446 9.9456 2.2Z"
          fill="#42444C"
        />
      </svg>
    </SvgIcon>
  )
}

export default MessageIcon
