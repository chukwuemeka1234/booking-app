import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { MdOutlineClose } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  TiSocialFacebook,
  TiSocialTwitter,
  TiSocialGooglePlus,
  TiSocialPinterest,
  TiSocialVimeo,
} from 'react-icons/ti';
import { logUserOut } from '../redux/users/userSlice';

const links = [
  { name: 'Scooter', path: '/' },
  { name: 'Reserve', path: '/reserve' },
  { name: 'My Reservations', path: '/reservations' },
  { name: 'Add Scooter', path: '/manage-page' },
];

const socialIcons = [
  <TiSocialTwitter key={0} />,
  <TiSocialFacebook key={1} />,
  <TiSocialGooglePlus key={2} />,
  <TiSocialVimeo key={3} />,
  <TiSocialPinterest key={4} />,
];

const NavItem = ({ name, path, style }) => {
  const location = useLocation();
  const currentRoute = location.pathname;

  return (
    <li>
      <NavLink
        to={path}
        className={
          currentRoute === path
            ? `${style} pl-3 py-2 block bg-emerald-500  text-white w-full font-semibold`
            : `${style} pl-3 py-2 block w-full font-semibold hover:bg-white`
        }
      >
        {name}
      </NavLink>
    </li>
  );
};

const SocialLink = ({ icon }) => <li className="mx-1">{icon}</li>;

const SideBar = ({ renderAside, setRenderAside }) => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteToken = () => {
    localStorage.removeItem('token');
  };

  const removeCurrentUser = () => {
    localStorage.removeItem('user');
  };

  const logout = () => {
    deleteToken();
    removeCurrentUser();
    dispatch(logUserOut());
  };

  return (
    <aside
      className={
        renderAside
          ? 'top-0 absolute bg-slate-100 lg:relative flex flex-col z-50 justify-between h-screen w-full lg:w-1/6 border-r-2 pt-0 pb-6'
          : 'hidden'
      }
    >
      <div className="lg:hidden absolute right-2 top-2 border">
        <button className="p-1" type="button" onClick={() => setRenderAside()}>
          <MdOutlineClose className="text-xl text-gray-700" />
        </button>
      </div>
      <div>
        {' '}
        <div className=" hidden lg:flex justify-center items-center">
          <img className="w-auto h-44" alt="logo" src="/logo.png" />
        </div>
        <ul className="pl-5 pt-12 lg:pt-0">
          {links.map((link) => (
            <NavItem
              key={links.indexOf(link)}
              name={link.name}
              path={link.path}
              style={!userState.isLoggedIn && link.path !== '/' && link.path !== '/reserve' ? 'hidden' : ''}
            />
          ))}
        </ul>
        <div className=" hidden  w-full lg:flex justify-center mt-10">
          {userState.isLoggedIn ? (
            <button
              className="py-2 bg-red-500 text-white font-semibold px-3 border"
              onClick={() => logout()}
              type="button"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="login"
              className="py-2 bg-red-500 text-white font-semibold px-3 border"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
      <div>
        <ul className="flex justify-center mb-3">
          {socialIcons.map((icon) => (
            <SocialLink icon={icon} key={icon.key} />
          ))}
        </ul>
        <span className="text-xs font-medium w-full text-center block">
          ©
          {' '}
          {new Date().getFullYear()}
          {' '}
          Booking App
        </span>
      </div>
    </aside>
  );
};

export default SideBar;

NavItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

SideBar.propTypes = {
  renderAside: PropTypes.bool.isRequired,
  setRenderAside: PropTypes.func.isRequired,
};

SocialLink.propTypes = {
  icon: PropTypes.element.isRequired,
};
