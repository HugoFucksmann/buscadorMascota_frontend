import * as React from "react";
import {
  Animated,
} from "react-native";
import foto from '../assets/iconos/circulo.png';

export class AnimacionComponente extends React.Component {
  constructor(props) {
    super(props);

    this.rotation = new Animated.Value(0);
  }

  componentDidMount() {
    if (this.props.animar === true) {
      this.animacion();
    }
  }

  animacion = () => {
    Animated.timing(this.rotation, {
      duration: 1500,
      toValue: 1,
    }).start((completion) => {
      if (completion.finished) {
        this.rotation.setValue(0);

        this.animacion();
      }
    });
  };

  render() {
    const rotation = this.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const transform = {
      transform: [
        {
          rotate: rotation,
        },
      ],
    };

    return (
      <Animated.Image
        style={[{ width: 100, height: 100 }, transform]}
        source={foto}
      />
    );
  }
}
