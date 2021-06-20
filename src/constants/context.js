import React from 'react';
import Api from "../api/api";

export const Context = React.createContext();

class ContextProvider extends React.Component{

  api = new Api();

  state = {
    genresId: {
      genres: []
    }
  };

  componentDidMount() {
    this.api.getGenres().then(res => {
      this.setState({
        genresId: res
      });
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const {children} = this.props;
    const {genresId} = this.state;

    return (
      // eslint-disable-next-line react/jsx-filename-extension
      <Context.Provider value={genresId}>
        {children}
      </Context.Provider>
    );
  };
}

export default ContextProvider;