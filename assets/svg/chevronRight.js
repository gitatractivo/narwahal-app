import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function chevronRight(props) {
  return (
    <Svg
      {...props}
      width="7"
      height="12"
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4.5998 5.9998L0.699805 2.0998C0.516471 1.91647 0.424805 1.68314 0.424805 1.3998C0.424805 1.11647 0.516471 0.883138 0.699805 0.699805C0.883138 0.516471 1.11647 0.424805 1.3998 0.424805C1.68314 0.424805 1.91647 0.516471 2.0998 0.699805L6.6998 5.2998C6.7998 5.3998 6.87064 5.50814 6.9123 5.6248C6.95397 5.74147 6.9748 5.86647 6.9748 5.9998C6.9748 6.13314 6.95397 6.25814 6.9123 6.3748C6.87064 6.49147 6.7998 6.5998 6.6998 6.6998L2.0998 11.2998C1.91647 11.4831 1.68314 11.5748 1.3998 11.5748C1.11647 11.5748 0.883138 11.4831 0.699805 11.2998C0.516471 11.1165 0.424805 10.8831 0.424805 10.5998C0.424805 10.3165 0.516471 10.0831 0.699805 9.89981L4.5998 5.9998Z"
        fill="#333B40"
      />
    </Svg>
  );
}

export default chevronRight;
