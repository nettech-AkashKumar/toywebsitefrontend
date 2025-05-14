import React from 'react';
import UserList from '../../Components/AdminPanels/UserList';
import UsersSection from '../../Components/AdminPanels/UsersSection';
import "../../Pages/Users/Users.css"

const Users = () => {
  return (
    <div>
      <div class="container">
        <div className="row">
          <div className="col-md-12 usersmain d-flex flex-column gap-3" style={{ paddingRight: '120px' }}>
            {/* <UserList/> */}
            <UsersSection />
          </div>

        </div>
      </div>

    </div>


  );
}

export default Users;
