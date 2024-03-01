import * as React from 'react';
import Svg, { Path, G, Mask, Rect } from 'react-native-svg';

function scanQR(props) {
  return (
    <Svg {...props} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Mask id="mask0_251_749" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
        <Rect width="16" height="16" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_251_749)">
        <Path d="M1.99967 4.66732C1.81079 4.66732 1.65245 4.60343 1.52467 4.47565C1.3969 4.34787 1.33301 4.18954 1.33301 4.00065V2.00065C1.33301 1.81176 1.3969 1.65343 1.52467 1.52565C1.65245 1.39787 1.81079 1.33398 1.99967 1.33398H3.99967C4.18856 1.33398 4.3469 1.39787 4.47467 1.52565C4.60245 1.65343 4.66634 1.81176 4.66634 2.00065C4.66634 2.18954 4.60245 2.34787 4.47467 2.47565C4.3469 2.60343 4.18856 2.66732 3.99967 2.66732H2.66634V4.00065C2.66634 4.18954 2.60245 4.34787 2.47467 4.47565C2.3469 4.60343 2.18856 4.66732 1.99967 4.66732ZM1.99967 14.6673C1.81079 14.6673 1.65245 14.6034 1.52467 14.4756C1.3969 14.3479 1.33301 14.1895 1.33301 14.0007V12.0007C1.33301 11.8118 1.3969 11.6534 1.52467 11.5257C1.65245 11.3979 1.81079 11.334 1.99967 11.334C2.18856 11.334 2.3469 11.3979 2.47467 11.5257C2.60245 11.6534 2.66634 11.8118 2.66634 12.0007V13.334H3.99967C4.18856 13.334 4.3469 13.3979 4.47467 13.5257C4.60245 13.6534 4.66634 13.8118 4.66634 14.0007C4.66634 14.1895 4.60245 14.3479 4.47467 14.4756C4.3469 14.6034 4.18856 14.6673 3.99967 14.6673H1.99967ZM11.9997 14.6673C11.8108 14.6673 11.6525 14.6034 11.5247 14.4756C11.3969 14.3479 11.333 14.1895 11.333 14.0007C11.333 13.8118 11.3969 13.6534 11.5247 13.5257C11.6525 13.3979 11.8108 13.334 11.9997 13.334H13.333V12.0007C13.333 11.8118 13.3969 11.6534 13.5247 11.5257C13.6525 11.3979 13.8108 11.334 13.9997 11.334C14.1886 11.334 14.3469 11.3979 14.4747 11.5257C14.6025 11.6534 14.6663 11.8118 14.6663 12.0007V14.0007C14.6663 14.1895 14.6025 14.3479 14.4747 14.4756C14.3469 14.6034 14.1886 14.6673 13.9997 14.6673H11.9997ZM13.9997 4.66732C13.8108 4.66732 13.6525 4.60343 13.5247 4.47565C13.3969 4.34787 13.333 4.18954 13.333 4.00065V2.66732H11.9997C11.8108 2.66732 11.6525 2.60343 11.5247 2.47565C11.3969 2.34787 11.333 2.18954 11.333 2.00065C11.333 1.81176 11.3969 1.65343 11.5247 1.52565C11.6525 1.39787 11.8108 1.33398 11.9997 1.33398H13.9997C14.1886 1.33398 14.3469 1.39787 14.4747 1.52565C14.6025 1.65343 14.6663 1.81176 14.6663 2.00065V4.00065C14.6663 4.18954 14.6025 4.34787 14.4747 4.47565C14.3469 4.60343 14.1886 4.66732 13.9997 4.66732ZM11.6663 12.6673V11.6673H12.6663V12.6673H11.6663ZM11.6663 10.6673V9.66732H12.6663V10.6673H11.6663ZM10.6663 11.6673V10.6673H11.6663V11.6673H10.6663ZM9.66634 12.6673V11.6673H10.6663V12.6673H9.66634ZM8.66634 11.6673V10.6673H9.66634V11.6673H8.66634ZM10.6663 9.66732V8.66732H11.6663V9.66732H10.6663ZM9.66634 10.6673V9.66732H10.6663V10.6673H9.66634ZM8.66634 9.66732V8.66732H9.66634V9.66732H8.66634ZM9.33301 7.33398C9.14412 7.33398 8.98579 7.2701 8.85801 7.14232C8.73023 7.01454 8.66634 6.85621 8.66634 6.66732V4.00065C8.66634 3.81176 8.73023 3.65343 8.85801 3.52565C8.98579 3.39787 9.14412 3.33398 9.33301 3.33398H11.9997C12.1886 3.33398 12.3469 3.39787 12.4747 3.52565C12.6025 3.65343 12.6663 3.81176 12.6663 4.00065V6.66732C12.6663 6.85621 12.6025 7.01454 12.4747 7.14232C12.3469 7.2701 12.1886 7.33398 11.9997 7.33398H9.33301ZM3.99967 12.6673C3.81079 12.6673 3.65245 12.6034 3.52467 12.4756C3.3969 12.3479 3.33301 12.1895 3.33301 12.0007V9.33398C3.33301 9.14509 3.3969 8.98676 3.52467 8.85898C3.65245 8.73121 3.81079 8.66732 3.99967 8.66732H6.66634C6.85523 8.66732 7.01356 8.73121 7.14134 8.85898C7.26912 8.98676 7.33301 9.14509 7.33301 9.33398V12.0007C7.33301 12.1895 7.26912 12.3479 7.14134 12.4756C7.01356 12.6034 6.85523 12.6673 6.66634 12.6673H3.99967ZM3.99967 7.33398C3.81079 7.33398 3.65245 7.2701 3.52467 7.14232C3.3969 7.01454 3.33301 6.85621 3.33301 6.66732V4.00065C3.33301 3.81176 3.3969 3.65343 3.52467 3.52565C3.65245 3.39787 3.81079 3.33398 3.99967 3.33398H6.66634C6.85523 3.33398 7.01356 3.39787 7.14134 3.52565C7.26912 3.65343 7.33301 3.81176 7.33301 4.00065V6.66732C7.33301 6.85621 7.26912 7.01454 7.14134 7.14232C7.01356 7.2701 6.85523 7.33398 6.66634 7.33398H3.99967ZM4.33301 11.6673H6.33301V9.66732H4.33301V11.6673ZM4.33301 6.33398H6.33301V4.33398H4.33301V6.33398ZM9.66634 6.33398H11.6663V4.33398H9.66634V6.33398Z" fill="white" />
      </G>
    </Svg>

  );
}

export default scanQR;