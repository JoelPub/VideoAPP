import HomeScreen from '../home/HomeViewContainer';
import ProfileScreen from '../profile/ProfileViewContainer';
import PagesScreen from '../pages/PagesViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconGrids = require('../../../assets/images/pages/profile.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Pages',
    component: PagesScreen,
    icon: iconPages,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    icon: iconGrids,
  },
];

export default tabNavigationData;