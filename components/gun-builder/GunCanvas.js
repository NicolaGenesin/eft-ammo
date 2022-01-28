import { Box } from "@chakra-ui/react";
import React, { Component } from "react";
import { render } from "react-dom";
import { Stage, Layer, Image, Line } from "react-konva";
import useImage from "use-image";

// the first very simple and recommended way:
const Gun = ({ src, canvasWidth, canvasHeight }) => {
  const [image] = useImage(src);

  let offsetX = 0;
  let offsetY = 0;

  if (image) {
    offsetX = canvasWidth / 2 - image.naturalWidth / 2;
    offsetY = canvasHeight / 2 - image.naturalHeight / 2;
  }

  return (
    <Image
      image={image}
      x={offsetX}
      y={offsetY}
      shadowBlur={50}
      stroke="white"
    />
  );
};

const Mod = ({ src, canvasWidth, canvasHeight, placement }) => {
  const [image] = useImage(src);

  let offsetX = 0;
  let offsetY = 0;

  if (image) {
    offsetX = placement[0] - image.naturalWidth / 2;
    offsetY = placement[1] - image.naturalHeight / 2;
  }

  return (
    <Image
      image={image}
      x={offsetX}
      y={offsetY}
      shadowBlur={50}
      stroke="white"
    />
  );
};

// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
class ComplexImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}

const canvasWidth = "1000";
const canvasHeight = "500";

const points = [0, 0, canvasWidth, canvasHeight];
const points2 = [canvasWidth, 0, 0, canvasHeight];

class GunCanvas extends Component {
  render() {
    return (
      <Box bg="vulcan.800">
        <Stage width={canvasWidth} height={canvasHeight}>
          <Layer>
            {/* <ComplexImage src="https://konvajs.org/assets/yoda.jpg" /> */}
            <Gun
              src="https://assets.tarkov-tools.com/5644bd2b4bdc2d3b4c8b4572-grid-image.jpg"
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
            <Line points={points} stroke="#ffffff44" />
            <Line points={points2} stroke="#ffffff44" />
            <Line points={[500, 280, 500, 450]} stroke="#ffffff88" />
            <Mod
              src="https://assets.tarkov-tools.com/5448c1d04bdc2dff2f8b4569-grid-image.jpg"
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              placement={[500, 450]}
            />
          </Layer>
        </Stage>
      </Box>
    );
  }
}

export default GunCanvas;
