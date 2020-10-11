import * as React from "react";
import Svg, { G, Rect } from "react-native-svg";
import colors from "../colors";

const MovixLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Svg width={props.width} height={props.height} viewBox="0 0 1024 1024">
      <G transform="matrix(1 0 0 1 14.208 -1111.607)">
        <Rect
          ry={0}
          y={1111.624}
          x={-14.199}
          height={1024.004}
          width={1024.004}
          fill={colors.dark}
        />
        <G transform="matrix(1.43324 0 0 1.43324 -235.63 956.803)">
          <Rect
            transform="rotate(-29.285) skewX(-.151)"
            ry={48.629}
            y={491.45}
            x={138.423}
            height={273.131}
            width={97.259}
            fill={colors.darkblue}
          />
          <Rect
            transform="rotate(30.773) skewX(-.027)"
            ry={48.604}
            y={60.063}
            x={511.967}
            height={295.37}
            width={97.208}
            fill={colors.lightblue}
          />
          <Rect
            transform="matrix(.8592 -.51164 -.51205 -.85896 0 0)"
            ry={48.604}
            y={-879.079}
            x={269.937}
            height={295.37}
            width={97.208}
            fill={colors.darkblue}
          />
          <Rect
            transform="matrix(.8722 .48916 .48685 -.87348 0 0)"
            ry={48.629}
            y={-263.979}
            x={658.237}
            height={273.131}
            width={97.259}
            fill={colors.lightblue}
          />
        </G>
      </G>
    </Svg>
  );
};

export default MovixLogo;
