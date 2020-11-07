import { compose, withState , lifecycle} from 'recompose';

import HomeScreen from './HomeView';

export default compose(withState('isExtended', 'setIsExtended', false),
lifecycle({
  componentDidMount() {
    console.log('componentDidMount');

  },
}))(
  HomeScreen,
);
