import { useNavigate } from 'react-router-dom';
import Logo from '../logo';

function Nav() {
  const navigate = useNavigate();

  const clickHandler = () => navigate('/');

  return (
    <div className="flex justify-center my-14">
      <Logo clickHandler={clickHandler}/>
    </div>
  );
}

export default Nav;
