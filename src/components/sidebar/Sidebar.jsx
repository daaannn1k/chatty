import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '@components/sidebar/Sidebar.scss';
import { sideBarItems, fontAwesomeIcons } from '@services/utils/static-data';
import { getState } from '@redux/reducers/user/user.reducer';
import { ProfileUtils } from '@services/utils/profile-utils.service';

const Sidebar = () => {
  const [sidebar, setSidebar] = useState([]);
  const profile = useSelector(state => getState(state).profile);
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToPage = (name, url) => {
    if(name === 'Profile') {
      const searchParams = createSearchParams({ id: profile?._id, uid: profile?.uId}).toString();
      url = `${url}?${searchParams}`;
    }

    navigate(url);
  };

  const checkUrl = (name) => {
    return location.pathname.includes(name.toLowerCase())
  };

  useEffect(() => {
    setSidebar(sideBarItems);
  }, []);
  
  return (
    <div className='app-side-menu'>
      <div className='side-menu'>
        <ul className='list-unstyled'>
          {sidebar.map(item => (
            <li key={item.index} onClick={() => navigateToPage(item.name, item.url)}>
              <div data-testid='sidebar-list' className={`sidebar-link ${checkUrl(item.name) && "active"}`}>
                <div className='menu-icon'>
                  {fontAwesomeIcons[item.iconName]}
                </div>
                <div className='menu-link'>
                  <span>
                    {item.name}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Sidebar.propTypes = {
}

export default Sidebar