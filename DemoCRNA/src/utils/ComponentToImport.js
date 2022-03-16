class ComponentToImport extends Component {
    constructor(props) {
      super(props);
      this.state = { module: null };
    }
  
    componentDidMount() {
      const { path } = this.props;
      import(`${path}`).then(module => this.setState({ module: module.default }));
    }
    render() {
      const { module: Component } = this.state;
      return <div>{Component && <Component />}</div>;
    }
  }