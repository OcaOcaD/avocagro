class Page extends Component {
  _isMounted = false;

  state = {
    isLoading: true
  }

  componentDidMount() {
    this._isMounted = true;
  
    callAPI_or_DB(...).then(result => {
      if (this._isMounted) {
        this.setState({isLoading: false})
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div>Whatever</div>
    );
  }
}