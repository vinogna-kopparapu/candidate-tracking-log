function Header({ username, onLogout }) {
    return (
      <header className="app-header">
        <div className="header-content">
          <h1>Trackify</h1>
          {username && (
            <div className="user-info">
              <span>Welcome, {username}!</span>
              <button onClick={onLogout} className="logout-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    );
  }
  
  export default Header;