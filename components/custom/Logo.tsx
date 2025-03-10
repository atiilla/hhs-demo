"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";
import { motion } from "framer-motion";

interface WrapperProps extends React.PropsWithChildren {
  className?: string;
}

// Renamed to MainLogo to avoid naming conflict with the default export
const MainLogo = () => {
  const mounted = useMounted();
  const { theme: currentTheme } = useTheme();

  if (!mounted) return null;

  // Update fill color based on theme
  let fill;
  switch (currentTheme) {
    case "dark":
      fill = "#fff"; // White for dark theme
      break;
    case "cyberwave":
      fill = "#80ffff"; // Cyan color for cyberwave theme (matches --foreground: 180 100% 80%)
      break;
    case "system":
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        fill = "#fff"; // White for dark mode
      } else {
        fill = "#000"; // Black for light mode
      }
      break;
    default:
      fill = "#000"; // Black for light and other themes
  }

  return (
    <SVG fill={fill} />
  );
};

const SVG = ({ fill }: { fill: string }) => {
  return <svg width="126" height="60" viewBox="0 0 1050 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="14" width="1022" height="472" stroke={fill} strokeWidth="28" />
    <circle cx="393" cy="250" r="50" fill={fill} />
    <circle cx="256" cy="388" r="50" fill={fill} />
    <circle cx="393" cy="388" r="50" fill={fill} />
    <circle cx="119" cy="388" r="50" fill={fill} />
    <circle cx="256" cy="112" r="50" fill={fill} />
    <rect x="488" width="25" height="500" fill={fill} />
    <path d="M565.03 160V92.55H579.47V120.005H605.025V92.55H619.465V160H605.025V132.165H579.47V160H565.03ZM627.344 160L651.664 92.55H668.764L693.084 160H678.074L673.134 145.655H647.199L642.259 160H627.344ZM651.284 133.78H669.144L660.214 107.75L651.284 133.78ZM699.459 160V92.55H726.439C734.545 92.55 740.879 94.5133 745.439 98.44C750.062 102.367 752.374 107.75 752.374 114.59C752.374 121.43 750.062 126.845 745.439 130.835C740.879 134.762 734.545 136.725 726.439 136.725H713.899V160H699.459ZM713.899 124.565H725.584C729.384 124.565 732.329 123.742 734.419 122.095C736.509 120.385 737.554 117.883 737.554 114.59C737.554 111.297 736.509 108.827 734.419 107.18C732.329 105.533 729.384 104.71 725.584 104.71H713.899V124.565ZM761.431 160V92.55H788.411C796.518 92.55 802.851 94.5133 807.411 98.44C812.035 102.367 814.346 107.75 814.346 114.59C814.346 121.43 812.035 126.845 807.411 130.835C802.851 134.762 796.518 136.725 788.411 136.725H775.871V160H761.431ZM775.871 124.565H787.556C791.356 124.565 794.301 123.742 796.391 122.095C798.481 120.385 799.526 117.883 799.526 114.59C799.526 111.297 798.481 108.827 796.391 107.18C794.301 105.533 791.356 104.71 787.556 104.71H775.871V124.565ZM837.226 160V133.78L813.761 92.55H829.721L844.446 119.72L859.076 92.55H875.036L851.666 133.78V160H837.226ZM565.03 284V216.55H579.47V244.005H605.025V216.55H619.465V284H605.025V256.165H579.47V284H565.03ZM627.344 284L651.664 216.55H668.764L693.084 284H678.074L673.134 269.655H647.199L642.259 284H627.344ZM651.284 257.78H669.144L660.214 231.75L651.284 257.78ZM726.569 285.52C720.426 285.52 714.979 284.127 710.229 281.34C705.479 278.553 701.743 274.532 699.019 269.275C696.296 264.018 694.934 257.717 694.934 250.37C694.934 243.213 696.233 237.007 698.829 231.75C701.489 226.43 705.194 222.313 709.944 219.4C714.758 216.487 720.394 215.03 726.854 215.03C735.658 215.03 742.498 217.215 747.374 221.585C752.251 225.892 755.418 232.067 756.874 240.11L741.864 240.68C741.104 236.437 739.458 233.143 736.924 230.8C734.391 228.393 731.034 227.19 726.854 227.19C721.471 227.19 717.291 229.312 714.314 233.555C711.338 237.735 709.849 243.34 709.849 250.37C709.849 257.463 711.369 263.068 714.409 267.185C717.449 271.302 721.566 273.36 726.759 273.36C731.256 273.36 734.771 272.093 737.304 269.56C739.838 266.963 741.421 263.385 742.054 258.825L757.159 259.395C755.766 267.628 752.504 274.057 747.374 278.68C742.308 283.24 735.373 285.52 726.569 285.52ZM767.183 284V216.55H781.623V246L806.133 216.55H822.948L798.153 246.285L824.468 284H808.033L788.653 255.975L781.623 264.145V284H767.183ZM831.754 284V216.55H846.194V284H831.754ZM858.936 284V216.55H874.896L901.686 263.1V216.55H916.126V284H899.976L873.376 239.065V284H858.936ZM956.822 285.52C950.299 285.52 944.725 284.032 940.102 281.055C935.479 278.078 931.9 273.962 929.367 268.705C926.897 263.385 925.662 257.273 925.662 250.37C925.662 243.593 926.929 237.545 929.462 232.225C931.995 226.905 935.637 222.725 940.387 219.685C945.2 216.582 950.964 215.03 957.677 215.03C966.417 215.03 973.13 217.183 977.817 221.49C982.567 225.797 985.67 231.528 987.127 238.685L972.212 239.35C971.515 235.613 970.027 232.668 967.747 230.515C965.53 228.298 962.205 227.19 957.772 227.19C953.909 227.19 950.679 228.203 948.082 230.23C945.549 232.257 943.649 235.012 942.382 238.495C941.179 241.978 940.577 245.937 940.577 250.37C940.577 254.867 941.179 258.857 942.382 262.34C943.649 265.76 945.549 268.452 948.082 270.415C950.679 272.378 954.004 273.36 958.057 273.36C962.49 273.36 966.037 272.062 968.697 269.465C971.357 266.868 972.845 263.543 973.162 259.49H957.772V248.945H987.317V284H978.387L977.912 274.405C976.139 277.762 973.352 280.453 969.552 282.48C965.815 284.507 961.572 285.52 956.822 285.52ZM591.725 409.52C582.985 409.52 576.113 407.367 571.11 403.06C566.17 398.753 563.447 392.99 562.94 385.77L577.475 385.105C578.045 389.095 579.502 392.167 581.845 394.32C584.188 396.473 587.545 397.55 591.915 397.55C595.462 397.55 598.217 396.917 600.18 395.65C602.207 394.32 603.22 392.357 603.22 389.76C603.22 388.177 602.84 386.815 602.08 385.675C601.32 384.472 599.863 383.395 597.71 382.445C595.557 381.432 592.39 380.45 588.21 379.5C582.447 378.17 577.792 376.682 574.245 375.035C570.762 373.388 568.228 371.33 566.645 368.86C565.062 366.327 564.27 363.16 564.27 359.36C564.27 355.37 565.252 351.855 567.215 348.815C569.242 345.712 572.155 343.305 575.955 341.595C579.755 339.885 584.283 339.03 589.54 339.03C595.113 339.03 599.832 340.012 603.695 341.975C607.558 343.938 610.567 346.63 612.72 350.05C614.873 353.47 616.203 357.397 616.71 361.83L602.27 362.59C601.89 359.107 600.592 356.32 598.375 354.23C596.222 352.077 593.213 351 589.35 351C586.057 351 583.46 351.728 581.56 353.185C579.723 354.642 578.805 356.542 578.805 358.885C578.805 360.532 579.217 361.925 580.04 363.065C580.863 364.142 582.288 365.092 584.315 365.915C586.342 366.738 589.192 367.53 592.865 368.29C599.135 369.557 604.075 371.172 607.685 373.135C611.295 375.035 613.86 377.315 615.38 379.975C616.963 382.635 617.755 385.675 617.755 389.095C617.755 393.275 616.678 396.917 614.525 400.02C612.435 403.06 609.427 405.403 605.5 407.05C601.637 408.697 597.045 409.52 591.725 409.52ZM628.209 408V340.55H655.189C663.295 340.55 669.629 342.513 674.189 346.44C678.812 350.367 681.124 355.75 681.124 362.59C681.124 369.43 678.812 374.845 674.189 378.835C669.629 382.762 663.295 384.725 655.189 384.725H642.649V408H628.209ZM642.649 372.565H654.334C658.134 372.565 661.079 371.742 663.169 370.095C665.259 368.385 666.304 365.883 666.304 362.59C666.304 359.297 665.259 356.827 663.169 355.18C661.079 353.533 658.134 352.71 654.334 352.71H642.649V372.565ZM678.926 408L703.246 340.55H720.346L744.666 408H729.656L724.716 393.655H698.781L693.841 408H678.926ZM702.866 381.78H720.726L711.796 355.75L702.866 381.78ZM778.151 409.52C772.008 409.52 766.561 408.127 761.811 405.34C757.061 402.553 753.325 398.532 750.601 393.275C747.878 388.018 746.516 381.717 746.516 374.37C746.516 367.213 747.815 361.007 750.411 355.75C753.071 350.43 756.776 346.313 761.526 343.4C766.34 340.487 771.976 339.03 778.436 339.03C787.24 339.03 794.08 341.215 798.956 345.585C803.833 349.892 807 356.067 808.456 364.11L793.446 364.68C792.686 360.437 791.04 357.143 788.506 354.8C785.973 352.393 782.616 351.19 778.436 351.19C773.053 351.19 768.873 353.312 765.896 357.555C762.92 361.735 761.431 367.34 761.431 374.37C761.431 381.463 762.951 387.068 765.991 391.185C769.031 395.302 773.148 397.36 778.341 397.36C782.838 397.36 786.353 396.093 788.886 393.56C791.42 390.963 793.003 387.385 793.636 382.825L808.741 383.395C807.348 391.628 804.086 398.057 798.956 402.68C793.89 407.24 786.955 409.52 778.151 409.52ZM818.301 408V340.55H865.231V352.71H832.741V368.195H864.091V380.165H832.741V395.84H865.991V408H818.301Z" fill={fill} />
  </svg>;
}

export function AsciiLogo({ className }: WrapperProps) {
  const asciiArt = `
             .*@@@@@@@%.
             .%@@@@@@@@.            
              #@@@@@@@@.            
             .#@@@@@@@@.            
             .#@@@@@@@#.            
                      .*@@@@@@@*    
                       %@@@@@@@*.   
                       #@@@@@@@%.   
                       #@@@@@@@#    
                      .#@@@@@@@+    
    .%@@@@@@#.#@@@@@@%:-%@@@@@@+    
    +@@@@@@@@.@@@@@@@@-%@@@@@@@*    
    =@@@@@@@@.@@@@@@@@=#@@@@@@@@.   
    =@@@@@@@@.@@@@@@@@-#@@@@@@@#.   
   .=@@@@@@@@.@@@@@@@@-*@@@@@@@*    
       .....   ......   ......      
                                    
`;

  const lines = asciiArt.split("\n");
  return (
    <div className={className}>
      {lines.map((line, index) => {
        return (
          <motion.pre
            key={index}
            className="text-primary text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            {line}
          </motion.pre>
        );
      })}
    </div>
  );
}

// Export the MainLogo component as the default export
export default MainLogo;