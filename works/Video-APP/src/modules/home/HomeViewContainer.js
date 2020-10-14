import { compose, withState , lifecycle} from 'recompose';

import HomeScreen from './HomeView';
import Tts from 'react-native-tts';
export default compose(withState('isExtended', 'setIsExtended', false),
lifecycle({
  componentDidMount() {
    console.log('componentDidMount');
    Tts.setDefaultLanguage('zh-CN');
    Tts.speak('没有人生活在过去，也没有人生活在未来，现在是生命确实占有的唯一形态。伟大的心灵，在这个世界更喜欢独白，自己与自己说话。');
    Tts.voices().then(voices => console.log(voices));

  },
}))(
  HomeScreen,
);
