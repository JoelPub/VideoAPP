import HomeScreen from '../home/HomeViewContainer';
import VideoScreen from '../video/VideoViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconVideo = require('../../../assets/images/tabbar/home.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Video',
    component: VideoScreen,
    icon: iconVideo,
  },
  {
    name: 'Pages',
    component: PagesScreen,
    icon: iconPages,
  },
  {
    name: 'Components',
    component: ComponentsScreen,
    icon: iconComponents,
  },
  {
    name: 'Grids',
    component: GridsScreen,
    icon: iconGrids,
  },
];

export default tabNavigationData;