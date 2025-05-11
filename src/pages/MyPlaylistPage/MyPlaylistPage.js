// src/pages/MyPlaylistPage/MyPlaylistPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { Link, Navigate } from 'react-router-dom';
// import apiClient from '../../services/api';
// import { useAuth } from '../../contexts/AuthContext'; // Ví dụ
import MusicItem from '../../components/MusicItem/MusicItem';
import './MyPlaylistPage.css'; // <--- ĐỔI TÊN IMPORT CSS

// ĐỔI TÊN FUNCTION COMPONENT
function MyPlaylistPage() {
  // const { currentUser } = useAuth();
  const currentUser = { id: 'user123', name: 'Demo User' }; // GIẢ LẬP

  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyPlaylistSongs = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setError(null);

    // // --- BỎ COMMENT KHI CÓ API ---
    // // backend: Cần API endpoint /api/me/my-playlist/songs (hoặc /api/playlists/{defaultUserPlaylistId}/songs)
    // // để lấy các bài hát trong playlist đặc biệt này của user.
    // try {
    //   // const response = await apiClient.get('/me/my-playlist/songs');
    //   // const playlistData = response.data;
    //   // setPlaylistName(playlistData.name || "My Playlist");
    //   // setSongs(playlistData.songs || []);
    // } catch (err) {
    //   setError('Không thể tải dữ liệu My Playlist.');
    //   console.error("Lỗi fetch My Playlist:", err);
    // } finally {
    //   setIsLoading(false);
    // }
    // // --- KẾT THÚC PHẦN API THẬT ---

    // --- DỮ LIỆU GIẢ LẬP ---
    setTimeout(() => {
      setPlaylistName("Playlist Của Tôi");
      setSongs([
        { id: 's201', title: 'Bài hát tự thêm 1', artist: 'Nghệ sĩ A', image: '/assets/song1.png' },
        { id: 's202', title: 'Track yêu thích trong playlist', artist: 'Nghệ sĩ B', image: '/assets/song2.png' },
        { id: 's203', title: 'Một chút EDM', artist: 'DJ X', image: '/assets/song1.png' },
        { id: 's204', title: 'Ballad cuối tuần', artist: 'Ca sĩ Y', image: '/assets/song2.png' },
      ]);
      setIsLoading(false);
    }, 1000);
    // --- KẾT THÚC GIẢ LẬP ---
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchMyPlaylistSongs();
    }
  }, [currentUser, fetchMyPlaylistSongs]);

  const handlePlaySong = (song) => {
    console.log("Phát bài hát từ My Playlist:", song);
    // playerContext.playTrack(song, songs);
  };

  if (!currentUser && !isLoading) {
    // Đổi class CSS nếu cần
    return <div className="myplaylist-page-error">Bạn cần <Link to="/login-popup-placeholder">đăng nhập</Link> để xem mục này.</div>;
  }
  if (isLoading) {
    // Đổi class CSS nếu cần
    return <div className="myplaylist-page-loading">Đang tải {playlistName}...</div>;
  }
  if (error) {
     // Đổi class CSS nếu cần
    return <div className="myplaylist-page-error">Lỗi: {error}</div>;
  }

  return (
    // ĐỔI TÊN CLASS CSS CHO CONTAINER CHÍNH
    <div className="myplaylist-page-container">
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> &gt; {playlistName}
      </div>
      {/* ĐỔI TÊN CLASS CSS CHO TIÊU ĐỀ */}
      <h1 className="myplaylist-title">{playlistName}</h1>
      {songs.length > 0 ? (
        // ĐỔI TÊN CLASS CSS CHO GRID
        <div className="myplaylist-songs-grid">
          {songs.map(song => (
            <MusicItem
              key={song.id}
              item={song}
              onClick={() => handlePlaySong(song)}
            />
          ))}
        </div>
      ) : (
        <p>Playlist này của bạn hiện đang trống.</p>
      )}
      {/* Nút xem thêm nếu có phân trang */}
    </div>
  );
}

// ĐỔI TÊN EXPORT
export default MyPlaylistPage;