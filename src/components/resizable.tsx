import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./resizable.css";

interface ResizableProps {
  direction: 'horizontal' | 'vertical';
  children: any;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === 'horizontal') {
    resizableProps = {
      className: 'resize-horizontal',
      minConstraints:[window.innerWidth * 0.2, Infinity],
      maxConstraints:[window.innerWidth * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ['e'], //e for east
    };
  } else {
    resizableProps = {
      maxConstraints:[Infinity, window.innerHeight * 0.9],
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
