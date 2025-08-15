/* AUTO-GENERATED FILE — DO NOT EDIT */
import { Routes, Route, Outlet } from 'react-router';
import Comp0 from './pages/index';
import Comp1 from './pages/about';
import Comp2 from './pages/post/index';
import Comp3 from './pages/post/[postId]/index';
import Comp4 from './pages/post/[postId]/comments';
import Comp5 from './pages/post/_layout';
import Comp6 from './pages/not-found';

export default function RoutesTreeGen() {
  return (
    <Routes>
      <Route index element={<Comp0 />} />
      <Route path="about" element={<Comp1 />} />
      <Route path="post" element={<Comp5 />}>
          <Route index element={<Comp2 />} />
          <Route path=":postId" element={<Outlet />}>
              <Route index element={<Comp3 />} />
              <Route path="comments" element={<Comp4 />} />
          </Route>
      </Route>
      <Route path="*" element={<Comp6 />} />
    </Routes>
  );
}
