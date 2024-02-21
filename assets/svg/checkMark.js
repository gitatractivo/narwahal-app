import * as React from 'react';
import Svg, {Path, Rect, Mask, G} from 'react-native-svg';

function checkMark(props) {
  return (
    <Svg
      {...props}
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_1_178"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="25">
        <Rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_1_178)">
        <Path
          d="M9.55 15.65L18.025 7.175C18.225 6.975 18.4625 6.875 18.7375 6.875C19.0125 6.875 19.25 6.975 19.45 7.175C19.65 7.375 19.75 7.6125 19.75 7.8875C19.75 8.1625 19.65 8.4 19.45 8.6L10.25 17.8C10.05 18 9.81667 18.1 9.55 18.1C9.28333 18.1 9.05 18 8.85 17.8L4.55 13.5C4.35 13.3 4.25417 13.0625 4.2625 12.7875C4.27083 12.5125 4.375 12.275 4.575 12.075C4.775 11.875 5.0125 11.775 5.2875 11.775C5.5625 11.775 5.8 11.875 6 12.075L9.55 15.65Z"
          fill="white"
        />
      </G>
    </Svg>
  );
}

export default checkMark;
