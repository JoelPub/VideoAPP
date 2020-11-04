import { compose, withState , lifecycle} from 'recompose';

import HomeScreen from './HomeView';
import Tts from 'react-native-tts';

export default compose(withState('isExtended', 'setIsExtended', false),
lifecycle({
  componentDidMount() {
    console.log('componentDidMount');
    Tts.setDefaultLanguage('zh-CN');
    Tts.speak('圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人圣诞老人');
    Tts.voices().then(voices => console.log(voices));

  },
}))(
  HomeScreen,
);
