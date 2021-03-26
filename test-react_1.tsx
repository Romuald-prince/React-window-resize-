/*
  Below you will find exemplary component that does nothing until window resize.
  On window resize it:
  - asynchronously fetches window dimensions,
  - informs parent about calculated total of even indexed dimensions multiplied by multiplier,
  - shows multiplied entries on the screen.

  Fix errors and improve code quality (remove or add code if needed).
  Use TypeScript.
  `entries` are null initially until data is fetched.
  MultiplierComponent should be a class based React component.
  If you prefer functional components please fix the one below and prepare a functional one additionally.

  React version 17
*/

import * as React from 'react';

type Props = {
  multiplier?: number,
  onNewTotal: (total: number) => void,
};

type State = {
  entries: number[],
};

class MultiplierComponent extends React.PureComponent<Props, State> {
  state = {
    isVisible: false,
    entries: null,
  };

  componentDidMount() {
    window.addEventListener("resize", this.onResize());
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.onResize());
  }

  static getDerivedStateFromProps(props, state) {
    if (props.multiplier !== state.entries) {
      return {
        this.notify(state.entries),
        entries: props.multiplier,
      };
    }

    return null;
  }

  // shouldComponentUpdate cannot be used in React.PureComponent,
  // but also we can manually use it for our check by creating a "class child extends React.Component"
  // inside our class "MultiplierComponent extends React.PureComponent"

  onResize() {
    this.setState({ isVisible: true });
    this.fetch();
  }
  fetch() {
    const entries = this.loadData();
    this.setState({ entries: entries });
    this.notify();
  }
  loadData(): Promise<number[]> {
    return new Promise((resolve) => window.setTimeout(() => resolve([
      window.innerWidth,
      window.innerHeight,
      window.outerWidth,
      window.outerHeight,
      window.screen.width,
    ]), 1500));
  }
  notify(multiplier = this.props.multiplier) {
    const totalEven = 0;
    for (i = 0; i < this.state.entries.length; i++) {
      if (i / 2 === 0) {
        totalEven += this.state.entries[i] * multiplier;
      }
    }

    this.props.onNewTotal(totalEven);
  }

  render() {
    const entries = this.state.entries;
    const isVisible = this.state.isVisible;

    if (isVisible === false) {
      return <div>Resize window to see make component visible!</div>;
    }

    return (
      <p>
        Multiplied entries:
        <ul>
          {
            entries.forEach((entry) => <p>{ entry * this.props.multiplier }</p>)
          }
        </ul>
      </p>
      <span>Window width = { entries[0] }</span>
    );
  }
}

export default MultiplierComponent;
