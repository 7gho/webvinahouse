// src/pages/FavoritesPage/FavoritesPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Navigate để chuyển hướng nếu chưa đăng nhập
// import apiClient from '../../services/api'; // Import nếu dùng axios
// import { useAuth } from '../../contexts/AuthContext'; // Ví dụ: Hook để lấy thông tin user
import MusicItem from '../../components/MusicItem/MusicItem';
import './FavoritesPage.css'; // Sẽ dùng chung CSS với GenrePage hoặc tạo riêng

function FavoritesPage() {
  // const { currentUser } = useAuth(); // Ví dụ: Lấy user hiện tại
  const currentUser = { id: 'user123', name: 'Demo User' }; // GIẢ LẬP USER ĐÃ ĐĂNG NHẬP

  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // Có thể thêm state cho phân trang nếu danh sách yêu thích quá dài
  // const [page, setPage] = useState(1);
  // const [hasMore, setHasMore] = useState(true);
  // const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Hàm fetch danh sách bài hát yêu thích
  const fetchFavoriteSongs = useCallback(async (/* pageNum = 1 */) => {
    if (!currentUser) return; // Không fetch nếu chưa đăng nhập

    // if (pageNum === 1) setIsLoading(true);
    // else setIsLoadingMore(true);
    setIsLoading(true); // Bỏ dòng này nếu dùng isLoadingMore
    setError(null);

    // // --- BỎ COMMENT KHI CÓ API ---
    // // backend: Cần API endpoint /api/me/favorites?page={pageNum}&limit=20 để lấy danh sách bài hát yêu thích của user hiện tại
    // try {
    //   // const response = await apiClient.get('/me/favorites', {
    //   //   params: { page: pageNum, limit: 20 } // Ví dụ lấy 20 bài mỗi lần
    //   // });
    //   // const newSongs = response.data.songs || [];
    //   // const totalPages = response.data.totalPages || 1;

    //   // setFavoriteSongs(prevSongs => pageNum === 1 ? newSongs : [...prevSongs, ...newSongs]);
    //   // setHasMore(pageNum < totalPages);
    //   // setPage(pageNum);

    // } catch (err) {
    //   console.error("Lỗi fetch danh sách yêu thích:", err);
    //   if (err.response && err.response.status === 401) { // Ví dụ: Lỗi chưa xác thực
    //       setError('Bạn cần đăng nhập để xem danh sách yêu thích.');
    //   } else {
    //       setError('Không thể tải danh sách yêu thích.');
    //   }
    // } finally {
    //   setIsLoading(false);
    //   // setIsLoadingMore(false);
    // }
    // // --- KẾT THÚC PHẦN API THẬT ---

    // --- DỮ LIỆU GIẢ LẬP (XÓA KHI CÓ API) ---
    setTimeout(() => {
      if (currentUser) {
        setFavoriteSongs([
            { id: 't1', title: 'Vaicaunoicokhiennguoithaydoi', artist: 'GREY D x tlinh', image: '/assets/song1.png' },
            { id: 's102', title: 'Leave The Door Open', artist: 'Bruno Mars, Anderson .Paak, Silk Sonic', image: '/assets/song2.png' },
            { id: 't3', title: 'See Tình', artist: 'Hoàng Thùy Linh', image: '/assets/song1.png' },
            { id: 's105', title: 'Có hẹn với thanh xuân', artist: 'MONSTAR', image: '/assets/song1.png'},
            { id: 't8', title: 'Waiting For You', artist: 'MONO', image: '/assets/song2.png'},
        ]);
        // setHasMore(false); // Giả lập chỉ có 1 trang
      }
      setIsLoading(false);
    }, 1000);
    // --- KẾT THÚC DỮ LIỆU GIẢ LẬP ---
  }, [currentUser]); // Dependency là currentUser

  // Fetch dữ liệu lần đầu
  useEffect(() => {
    if (currentUser) {
      // setFavoriteSongs([]);
      // setPage(1);
      // setHasMore(true);
      fetchFavoriteSongs(1);
    }
  }, [currentUser, fetchFavoriteSongs]);

  // Hàm xử lý khi click vào bài hát
  const handlePlaySong = (song) => {
    console.log("Phát bài hát yêu thích:", song);
    // // todo: Tích hợp với MusicPlayer
    // playerContext.playTrack(song, favoriteSongs); // Gửi cả danh sách để player biết context
  };

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập (hoặc trang chủ)
  if (!currentUser && !isLoading) { // Chỉ chuyển hướng khi không loading để tránh lỗi ban đầu
    // return <Navigate to="/login" replace />; // Ví dụ chuyển về trang login
    return <div className="favorites-page-error">Bạn cần <Link to="/login-popup-placeholder">đăng nhập</Link> để xem mục này.</div>; // Hoặc hiển thị thông báo
  }

  // Hiển thị loading
  if (isLoading) {
    return <div className="favorites-page-loading">Đang tải danh sách yêu thích...</div>;
  }

  // Hiển thị lỗi
  if (error) {
    return <div className="favorites-page-error">Lỗi: {error}</div>;
  }

  return (
    <div className="favorites-page-container"> {/* Sử dụng class tương tự GenrePage */}
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> &gt; Yêu thích
      </div>

      <h1 className="favorites-title">Bài hát Yêu thích</h1>

      {favoriteSongs.length > 0 ? (
        <div className="favorites-songs-grid"> {/* Sử dụng class tương tự GenrePage */}
          {favoriteSongs.map(song => (
            <MusicItem
              key={song.id}
              item={song}
              onClick={() => handlePlaySong(song)}
            />
          ))}
        </div>
      ) : (
        <p>Bạn chưa có bài hát yêu thích nào.</p>
      )}

      {/* Nút Xem Thêm (nếu có phân trang) */}
      {/* {hasMore && (
        <button
          className="load-more-button favorites-load-more"
          onClick={() => fetchFavoriteSongs(page + 1)}
          disabled={isLoadingMore}
        >
          {isLoadingMore ? 'Đang tải...' : 'XEM THÊM'}
        </button>
      )} */}
    </div>
  );
}

export default FavoritesPage;