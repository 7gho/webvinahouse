import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

// Import icons
import trangchuIcon from '../../assets/trangchu-sidebar.png';
import theloaiIcon from '../../assets/theloai-sidebar.png';
import djIcon from '../../assets/dj-sidebar.png'; // Giả sử tên file là dj-sidebar.png
import playlistIcon from '../../assets/playlist-sidebar.png'; // Sửa tên file nếu cần
import favIcon from '../../assets/fav-sidebar.png';
import myPlaylistIcon from '../../assets/my-playlist-sidebar.png';

// Giả sử bạn có danh sách các thể loại, DJ, Playlist từ API
// backend: cần api lấy danh sách thể loại, dj, playlist
const genres = ["NHẠC VIỆT HOT", "NHẠC GÕ", "NHẠC TRÔI", "NHẠC TƯNG TỬNG", "TIKTOK REMIX", "NHẠC CỔ"];
const djs = ["DJ A", "DJ B", "DJ C"]; // Dữ liệu giả
const playlists = ["Playlist 1", "Playlist 2"]; // Dữ liệu giả

function SidebarItem({ icon, text, to, children, hasDropdown, isOpen, onClick }) {
  return (
    <div className="sidebar-item-container">
      <Link to={to || '#'} className="sidebar-item" onClick={hasDropdown ? onClick : null}>
        <img src={icon} alt={text} />
        <span className="text-uppercase">{text}</span>
        {hasDropdown && <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>}
      </Link>
      {hasDropdown && isOpen && (
        <div className="dropdown-menu">
          {children}
        </div>
      )}
    </div>
  );
}

function Sidebar({ isOpen, toggleSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(null); // Lưu trữ dropdown nào đang mở

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <>
      {/* Thanh trigger nhỏ */}
      <div className={`sidebar-trigger ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        {isOpen ? '<' : '>'}
      </div>

      {/* Sidebar chính */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <SidebarItem icon={trangchuIcon} text="TRANG CHỦ" to="/" />

          <SidebarItem
            icon={theloaiIcon}
            text="THỂ LOẠI"
            hasDropdown
            isOpen={openDropdown === 'genres'}
            onClick={() => handleDropdownClick('genres')}
          >
            {genres.map(genre => (
              // backend: link cần trỏ đến trang thể loại tương ứng, ví dụ /genre/nhac-viet-hot
              <Link key={genre} to={`/genre/${genre.toLowerCase().replace(/ /g, '-')}`} className="dropdown-item font-light">
                {genre}
              </Link>
            ))}
          </SidebarItem>

          <SidebarItem
            icon={djIcon}
            text="DJ"
            hasDropdown
            isOpen={openDropdown === 'djs'}
            onClick={() => handleDropdownClick('djs')}
          >
            {/* // backend: link đến trang danh sách DJ */}
             <Link to="/djs" className="dropdown-item font-light">Tất cả DJ</Link>
            {djs.map(dj => (
              // backend: link cần trỏ đến trang dj cá nhân, ví dụ /dj/dj-a
              <Link key={dj} to={`/dj/${dj.toLowerCase().replace(/ /g, '-')}`} className="dropdown-item font-light">
                {dj}
              </Link>
            ))}
          </SidebarItem>


          <SidebarItem
            icon={playlistIcon}
            text="PLAYLIST"
            hasDropdown
            isOpen={openDropdown === 'playlists'}
            onClick={() => handleDropdownClick('playlists')}
          >
             {/* // backend: link đến trang danh sách Playlist */}
             <Link to="/playlists" className="dropdown-item font-light">Tất cả Playlist</Link>
            {playlists.map(playlist => (
               // backend: link cần trỏ đến trang playlist, ví dụ /playlist/playlist-1
              <Link key={playlist} to={`/playlist/${playlist.toLowerCase().replace(/ /g, '-')}`} className="dropdown-item font-light">
                {playlist}
              </Link>
            ))}
          </SidebarItem>


          <hr className="sidebar-divider" />

          {/* // backend: các link này cần kiểm tra xem user đã đăng nhập chưa */}
          <SidebarItem icon={favIcon} text="YÊU THÍCH" to="/favorites" />
          <SidebarItem icon={myPlaylistIcon} text="MY PLAYLIST" to="/my-playlist" />
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;