import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { useEffect, useState } from "react";
import "./resizable.css";

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: any;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timer: any;
    // Listen to resize event
    const listener = () => {
      // deBouncer technique
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    }
  }, []);

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints:[innerWidth * 0.2, Infinity],
      maxConstraints:[innerWidth * 0.75, Infinity],
      height: Infinity,
      width: innerWidth * 0.75,
      resizeHandles: ['e'], //e for east
    };
  } else {
    resizableProps = {
      maxConstraints:[Infinity, innerHeight * 0.9],
      minConstraints:[Infinity, 30],
      height: 300,
      width: Infinity ,
      resizeHandles: ['s'], //s for south
    };
  }

  return (
    <ResizableBox {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
