/* AUTO-GENERATED FILE — DO NOT EDIT */
import { Routes, Route, Outlet } from 'react-router';
import Comp0 from './pages/index';
import Comp1 from './pages/about';
import Comp2 from './pages/(tabs)/product';
import Comp3 from './pages/(tabs)/not-found';
import Comp4 from './pages/(tabs)/_layout';
import Comp5 from './pages/(tabs)/not-found';
import Comp6 from './pages/post/index';
import Comp7 from './pages/post/[postId]/index';
import Comp8 from './pages/post/[postId]/comments';
import Comp9 from './pages/post/not-found';
import Comp10 from './pages/post/_layout';
import Comp11 from './pages/user/(customer)/index';
import Comp12 from './pages/not-found';

export default function RoutesTreeFileGen() {
  return (
    <Routes>
      <Route index element={<Comp0 />} />
      <Route path="about" element={<Comp1 />} />
      <Route element={<Comp4 />}>
          <Route path="product" element={<Comp2 />} />
          <Route path="*" element={<Comp3 />} />
      </Route>
      <Route path="*" element={<Comp5 />} />
      <Route path="post" element={<Comp10 />}>
          <Route index element={<Comp6 />} />
          <Route path=":postId" element={<Outlet />}>
              <Route index element={<Comp7 />} />
              <Route path="comments" element={<Comp8 />} />
          </Route>
          <Route path="*" element={<Comp9 />} />
      </Route>
      <Route path="user" element={<Outlet />}>
          <Route element={<Outlet />}>
              <Route index element={<Comp11 />} />
          </Route>
      </Route>
      <Route path="*" element={<Comp12 />} />
    </Routes>
  );
}
