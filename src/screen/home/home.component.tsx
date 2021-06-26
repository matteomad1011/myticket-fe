import {Route, Switch} from 'react-router-dom';
import {CartComponent} from './cart/cart.component';
import {Navbar} from './component/navbar.component';
import {EventDetailPage} from './events/eventDetails/eventDetail.component';
import {UserPage} from '../user/user.component';
import {HomePageComponent} from './landing/home.components';

export const Home = () => {

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path={`/events/:id`} exact>
          <EventDetailPage />
        </Route>
        <Route path={"/cart"}>
          <CartComponent />
        </Route>
        <Route path={"/user"}>
          <UserPage />
        </Route>
        <Route path="/">
            <HomePageComponent />
        </Route>
      </Switch>
    </div>
  );
};
