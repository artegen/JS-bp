/* eslint-disable no-undef, no-unused-vars, react/react-in-jsx-scope */

class Circles extends Component {
  componentDidMount() {
    this.tick();
  }
  tick = () => {
    requestAnimationFrame(() => {
      this.setState(
        {
          /* Some new state */
        },
        this.tick
      );
    });
  };
  render() {
    return <div>{[...Array(100)].map(() => <Circle />)}</div>;
  }
}

const newItems = this.state.items.concat([prompt('Enter some text')]);

class IncDec extends Component {
  state = { count: 0 };
  increment = delta => this.setState(state => ({ count: state.count + delta }));
  render() {
    return (
      <div
        className={classNames({
          positive: this.state > 0,
          negative: this.state < 0,
        })}
      >
        <div className={countClassName}>{count}</div>
        <button onClick={() => this.increment(-1)}>-1</button>
        <button onClick={() => this.increment(1)}>+1</button>
      </div>
    );
  }
}

const IntersperseDividers = ({ children }) => (
  <div>
    {React.Children.toArray(children).reduce((elements, child, i, array) => {
      elements.push(child);
      if (i < array.length - 1) {
        elements.push(<hr key={`${i}--divider`} />);
      }
      return elements;
    }, [])}
  </div>
);
