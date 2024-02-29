import * as React from 'react';
import Svg, {Path, Rect, Line} from 'react-native-svg';

function pin(props) {
  return (
    <Svg
      {...props}
      width="93"
      height="16"
      viewBox="0 0 93 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Rect
        x="0.804587"
        y="0.581808"
        width="70.0027"
        height="14.065"
        rx="7.03248"
        stroke="#0B0B0B"
        stroke-width="0.858929"
      />
      <Path
        d="M71.2368 7.54004L92.2786 7.68867"
        stroke="black"
        stroke-width="0.858929"
      />
      <Line
        x1="70.1622"
        y1="7.56077"
        x2="71.2359"
        y2="7.56077"
        stroke="white"
        stroke-width="0.858929"
      />
    </Svg>
  );
}

export default pin;
