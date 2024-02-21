import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function box(props) {
  return (
    <Svg
      {...props}
      width="17"
      height="20"
      viewBox="0 0 17 20"
      xmlns="http://www.w3.org/2000/svg">
      <Path d="M7.90725 17.488V10.0953L1.64809 6.47779V13.6887C1.64809 13.7425 1.66158 13.793 1.68857 13.8402C1.71553 13.8873 1.75599 13.9277 1.80994 13.9614L7.90725 17.488ZM9.27473 17.488L15.372 13.9876C15.426 13.954 15.4664 13.9136 15.4934 13.8664C15.5204 13.8193 15.5339 13.7688 15.5339 13.7149V6.50405L9.27473 10.0953V17.488ZM7.74538 18.9968L1.12619 15.1611C0.8601 15.0083 0.652646 14.8038 0.50383 14.5476C0.354996 14.2914 0.280579 14.0105 0.280579 13.7048V5.68603C0.280579 5.38038 0.354996 5.09947 0.50383 4.84328C0.652646 4.58707 0.8601 4.38255 1.12619 4.22973L7.74538 0.394053C8.01201 0.2392 8.29446 0.161774 8.59273 0.161774C8.89097 0.161774 9.17227 0.2392 9.4366 0.394053L16.0558 4.22973C16.3219 4.38255 16.5293 4.58707 16.6782 4.84328C16.827 5.09947 16.9014 5.38038 16.9014 5.68603V13.7048C16.9014 14.0105 16.827 14.2914 16.6782 14.5476C16.5293 14.8038 16.3219 15.0083 16.0558 15.1611L9.4366 18.9968C9.16997 19.1517 8.88752 19.2291 8.58925 19.2291C8.29101 19.2291 8.00972 19.1517 7.74538 18.9968ZM12.4367 6.67577L15.0342 5.19926L8.72653 1.59381C8.67259 1.56015 8.61864 1.54332 8.56469 1.54332C8.51074 1.54332 8.4568 1.56015 8.40285 1.59381L6.06627 2.95923L12.4367 6.67577ZM8.59099 8.89558L11.142 7.42917L4.64616 3.75908L2.14774 5.19926L8.59099 8.89558Z" />
    </Svg>
  );
}

export default box;