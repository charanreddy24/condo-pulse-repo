import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '/src/redux/theme/themeSlice.js';
import { signOutSuccess } from '../redux/user/userSlice.js';

export default function NavbarHeader() {
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
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

      <form onSubmit={handleSubmit} className="mt-5">
        <TextInput
          type="text"
          placeholder="Press Enter to Search"
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
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
        {currentUser ? (
          <Navbar.Link active={path.pathname === '/PostOrders'} as={'div'}>
            <Link to="/PostOrders">Post Orders</Link>
          </Navbar.Link>
        ) : null}
        {currentUser ? (
          <Navbar.Link
            active={path.pathname === '/importantContacts'}
            as={'div'}
          >
            <Link to="/importantContacts">Important Contacts</Link>
          </Navbar.Link>
        ) : null}
        {currentUser ? null : (
          <Navbar.Link active={path.pathname === '/sign-up'} as={'div'}>
            <Link to="/sign-up">Sign Up</Link>
          </Navbar.Link>
        )}
      </Navbar.Collapse>
      <Link
        to="https://www.google.com/maps/@43.6888639,-79.3903299,3a,75y,342.85h,90t/data=!3m6!1e1!3m4!1s0AZ4h741599tmvZOAcPNgA!2e0!7i16384!8i8192?entry=ttu"
        target="_blank"
        rel="noopener noreferrer"
        className=" items-center justify-between hidden lg:inline hover:underline hover:text-blue-400"
      >
        <div className="font-bold p-2">
          <p className="text-sm">Location: 80 St. Clair Ave E</p>
        </div>
      </Link>
    </Navbar>
  );
}
