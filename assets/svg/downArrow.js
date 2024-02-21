import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function downArrow(props) {
  return (
    <Svg
      {...props}
      width="8"
      height="4"
      viewBox="0 0 8 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3.94792 3.76474C3.87217 3.76474 3.80117 3.75291 3.73489 3.72924C3.66862 3.70557 3.60708 3.66533 3.55028 3.60852L0.937221 0.995469C0.833078 0.891325 0.781006 0.758779 0.781006 0.59783C0.781006 0.436881 0.833078 0.304335 0.937221 0.200191C1.04136 0.0960476 1.17391 0.0439758 1.33486 0.0439758C1.49581 0.0439758 1.62836 0.0960476 1.7325 0.200191L3.94792 2.41561L6.16333 0.200191C6.26748 0.0960476 6.40002 0.0439758 6.56097 0.0439758C6.72192 0.0439758 6.85447 0.0960476 6.95861 0.200191C7.06275 0.304335 7.11483 0.436881 7.11483 0.59783C7.11483 0.758779 7.06275 0.891325 6.95861 0.995469L4.34555 3.60852C4.28875 3.66533 4.22721 3.70557 4.16094 3.72924C4.09466 3.75291 4.02366 3.76474 3.94792 3.76474Z"
        fill="#1C1B1F"
      />
    </Svg>
  );
}

export default downArrow;
