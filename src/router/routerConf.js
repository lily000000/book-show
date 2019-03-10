import Loadable from 'react-loadable';
import Loading from 'components/load';
import MainLayout from 'layout/mainLayout';

const BookRack = Loadable({
  loader: () => import('pages/bookRack'),
  loading: Loading
});
const Collect = Loadable({
  loader: () => import('pages/collect'),
  loading: Loading
});
const Choiceness = Loadable({
  loader: () => import('pages/choiceness'),
  loading: Loading
});
const Details = Loadable({
  loader: () => import('pages/details'),
  loading: Loading
});

const routerConf = [{
    path: '/',
    layout: null,
    redirect: '/main-analyse'
  },
  {
    path: '/main-analyse',
    layout: MainLayout,
    component: BookRack,
  },
  {
    path: '/brand-analyse',
    layout: MainLayout,
    component: Choiceness
  },
  {
    path: '/goods-analyse',
    layout: MainLayout,
    component: Collect
  },
  {
    path: '/details',
    layout: null,
    component: Details,
  },
]

export default routerConf;