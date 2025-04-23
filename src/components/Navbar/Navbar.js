import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // CSS cho Navbar
// import axios from 'axios'; // Sử dụng khi tích hợp API tìm kiếm

// Import hình ảnh (đảm bảo đường dẫn đúng)
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/searchicon.png';
import userIcon from '../../assets/usericon.png';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const navigate = useNavigate();

  // // Giả sử có state kiểm tra đăng nhập
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // // backend: cần api kiểm tra trạng thái đăng nhập của user
  // useEffect(() => {
  //   // Gọi API kiểm tra session hoặc token để set isLoggedIn
  // }, []);

  // // Ghi chú: phần isLoggedIn này cần state management (Context/Redux) để quản lý tốt hơn
  const isLoggedIn = false; // Placeholder

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10); // Thu nhỏ navbar nếu scroll xuống > 10px
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseEnter = () => setIsInteracting(true);
  const handleMouseLeave = () => setIsInteracting(false);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
      // Có thể thêm debounce để không gọi API liên tục
      if (event.target.value.trim() !== '') {
          // Gọi API tìm kiếm ở đây
          performSearch(event.target.value);
      } else {
          setSearchResults([]);
          setSearchError('');
      }
  };

  const performSearch = async (query) => {
    setSearchError(''); // Reset lỗi
    // // backend: gọi api tìm kiếm
    // try {
    //   // const response = await axios.get(`/api/search?q=${encodeURIComponent(query)}`); // Thay đổi endpoint cho phù hợp
    //   // // backend: api tìm kiếm cần trả về danh sách bài hát khớp query (không phân biệt dấu)
    //   // if (response.data && response.data.length > 0) {
    //   //     setSearchResults(response.data);
    //   // } else {
    //   //     setSearchResults([]);
    //   //     setSearchError('Xin lỗi, tớ không tìm thấy bài hát nào chứa từ khóa này! ');
    //   // }
    //
    //   // Placeholder data for testing
    //   if (query.toLowerCase().includes("test")) {
    //        setSearchResults([{ id: 1, title: 'Test Song 1' }, { id: 2, title: 'Another Test' }]);
    //   } else {
    //        setSearchResults([]);
    //        setSearchError('Xin lỗi, tớ không tìm thấy bài hát nào chứa từ khóa này! ');
    //   }
    //
    // } catch (error) {
    //   console.error("Lỗi tìm kiếm:", error);
    //   setSearchResults([]);
    //   setSearchError('Đã có lỗi xảy ra khi tìm kiếm.');
    //   // backend: xử lý lỗi từ api nếu có
    // }
     // --- Xóa phần placeholder khi có API ---
     if (query.toLowerCase().includes("test")) {
           setSearchResults([{ id: 1, title: 'Test Song 1' }, { id: 2, title: 'Another Test' }]);
           setSearchError('');
      } else {
           setSearchResults([]);
           setSearchError('Xin lỗi, tớ không tìm thấy bài hát nào chứa từ khóa này! :(');
      }
     // --- Kết thúc phần placeholder ---
  };


  const handleLogout = () => {
      // // backend: gọi api đăng xuất
      // setIsLoggedIn(false); // Cập nhật state sau khi đăng xuất thành công
      setShowUserMenu(false);
      navigate('/'); // Chuyển về trang chủ
      console.log("Đăng xuất"); // Placeholder
  }

  // Class cho navbar dựa trên state
  const navbarClass = `navbar ${isScrolled && !isInteracting ? 'navbar-shrunk' : ''}`;

  return (
    <nav
      className={navbarClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </Link>

        <div className="navbar-search">
          <img src={searchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="text"
            placeholder="TÌM KIẾM"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Hiển thị kết quả tìm kiếm hoặc lỗi */}
          {(searchResults.length > 0 || searchError) && (
            <div className="search-results-dropdown">
              {searchResults.map((song) => (
                 // backend: cấu trúc dữ liệu song cần có id và title (hoặc tên bài hát)
                <div key={song.id} className="search-result-item">
                  {song.title}
                  {/* // todo: xử lý khi click vào kết quả tìm kiếm (ví dụ: phát nhạc) */}
                </div>
              ))}
              {searchError && <div className="search-error">{searchError}</div>}
            </div>
          )}
        </div>

        <div className="navbar-user" onClick={toggleUserMenu}>
          <img src={userIcon} alt="User Icon" />
          {showUserMenu && (
            <div className="user-dropdown">
              {isLoggedIn ? (
                <>
                  {/* // backend: link tới các trang tương ứng */}
                  <Link to="/user/profile">Thông tin tài khoản</Link>
                  <Link to="/favorites">Yêu thích</Link>
                  <Link to="/my-playlist">My Playlist</Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </>
              ) : (
                <>
                  {/* // todo: mở popup đăng nhập/đăng ký */}
                  <button onClick={() => console.log('Mở popup Đăng nhập')}>Đăng nhập</button>
                  <button onClick={() => console.log('Mở popup Đăng ký')}>Đăng ký</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;