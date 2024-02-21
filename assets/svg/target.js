import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';

function target(props) {
  return (
    <Svg
      {...props}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G opacity="0.6">
        <Path
          d="M9 12.5C9.79565 12.5 10.5587 12.1839 11.1213 11.6213C11.6839 11.0587 12 10.2956 12 9.5C12 8.70435 11.6839 7.94129 11.1213 7.37868C10.5587 6.81607 9.79565 6.5 9 6.5C8.20435 6.5 7.44129 6.81607 6.87868 7.37868C6.31607 7.94129 6 8.70435 6 9.5C6 10.2956 6.31607 11.0587 6.87868 11.6213C7.44129 12.1839 8.20435 12.5 9 12.5Z"
          fill="black"
        />
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 0.5C9.26522 0.5 9.51957 0.605357 9.70711 0.792893C9.89464 0.98043 10 1.23478 10 1.5V2.57C11.496 2.78623 12.8818 3.48059 13.9506 4.54939C15.0194 5.61818 15.7138 7.00405 15.93 8.5H17C17.2652 8.5 17.5196 8.60536 17.7071 8.79289C17.8946 8.98043 18 9.23478 18 9.5C18 9.76522 17.8946 10.0196 17.7071 10.2071C17.5196 10.3946 17.2652 10.5 17 10.5H15.93C15.7138 11.996 15.0194 13.3818 13.9506 14.4506C12.8818 15.5194 11.496 16.2138 10 16.43V17.5C10 17.7652 9.89464 18.0196 9.70711 18.2071C9.51957 18.3946 9.26522 18.5 9 18.5C8.73478 18.5 8.48043 18.3946 8.29289 18.2071C8.10536 18.0196 8 17.7652 8 17.5V16.43C6.50405 16.2138 5.11818 15.5194 4.04939 14.4506C2.98059 13.3818 2.28623 11.996 2.07 10.5H1C0.734784 10.5 0.48043 10.3946 0.292893 10.2071C0.105357 10.0196 0 9.76522 0 9.5C0 9.23478 0.105357 8.98043 0.292893 8.79289C0.48043 8.60536 0.734784 8.5 1 8.5H2.07C2.28638 7.00411 2.9808 5.61833 4.04956 4.54956C5.11833 3.4808 6.50411 2.78638 8 2.57V1.5C8 1.23478 8.10536 0.98043 8.29289 0.792893C8.48043 0.605357 8.73478 0.5 9 0.5ZM4 9.5C4 8.17392 4.52678 6.90215 5.46447 5.96447C6.40215 5.02678 7.67392 4.5 9 4.5C10.3261 4.5 11.5979 5.02678 12.5355 5.96447C13.4732 6.90215 14 8.17392 14 9.5C14 10.8261 13.4732 12.0979 12.5355 13.0355C11.5979 13.9732 10.3261 14.5 9 14.5C7.67392 14.5 6.40215 13.9732 5.46447 13.0355C4.52678 12.0979 4 10.8261 4 9.5Z"
          fill="black"
        />
      </G>
    </Svg>
  );
}

export default target;
