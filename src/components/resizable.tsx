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
      height: 
    };
  } else {
    resizableProps = {

    };
  }

  return (
    <ResizableBox
      maxConstraints={[Infinity, window.innerHeight * 0.9]}
      minConstraints={[Infinity, 30]}
      height={300}
      width={Infinity}
      resizeHandles={['s']}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
