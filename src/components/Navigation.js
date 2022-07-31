import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

const Nav = styled.nav`
  position: fixed;
  bottom: 1rem;
  left: 50%;
  width: 100%;
  max-width: 30rem;
  height: 3.5rem;
  transform: translateX(-50%);

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 0 1rem;

    li a {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;

      color: #979797;

      &.on {
        color: #ee6723;
      }
    }
  }
`;

const Navigation = () => {
  console.log(useLocation());
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/" className={useLocation().pathname === '/' ? 'on' : null}>
            <FontAwesomeIcon icon={faHouse} />
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={useLocation().pathname === '/profile' ? 'on' : null}
          >
            <FontAwesomeIcon icon={faUser} />
            Profile
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

export default Navigation;
