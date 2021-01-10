import { compose, withState , lifecycle} from 'recompose';

import RegisterScreen from './RegisterView';

export default compose(withState('isExtended', 'setIsExtended', false),
lifecycle({
  componentDidMount() {
    console.log('RegisterViewContainer componentDidMount');

  },
}))(
  RegisterScreen,
);
