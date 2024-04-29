import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '/src/redux/theme/themeSlice.js';
import { signOutSuccess } from '../redux/user/userSlice.js';

export default function NavbarHeader() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-red-300 via-mint-500 to-purple-300 rounded-lg">
          HD Protective Services
        </span>
      </Link>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {currentUser ? (
          <Navbar.Link active={path.pathname === '/'} as={'div'}>
            <Link to="/">Home</Link>
          </Navbar.Link>
        ) : (
          <Navbar.Link active={path.pathname === '/'} as={'div'}>
            <Link to="/home">Home</Link>
          </Navbar.Link>
        )}
        {currentUser ? null : (
          <Navbar.Link active={path.pathname === '/about'} as={'div'}>
            <Link to="/about">About</Link>
          </Navbar.Link>
        )}
        {currentUser ? null : (
          <Navbar.Link active={path.pathname === '/sign-up'} as={'div'}>
            <Link to="/sign-up">Sign Up</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
