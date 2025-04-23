import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage';

// Import các page khác khi tạo xong
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import UserProfilePage from './pages/UserProfilePage';
// import FavoritesPage from './pages/FavoritesPage';
// import MyPlaylistPage from './pages/MyPlaylistPage';
import PlaylistListPage from './pages/PlaylistListPage/PlaylistListPage';
import DJListPage from './pages/DJListPage/DJListPage';
import GenrePage from './pages/GenrePage/GenrePage';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage';
import DJPage from './pages/DJPage/DJPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Sử dụng Layout component cho các route cần Navbar, Sidebar, Footer */}
        <Route path="/" element={<Layout />}>
          {/* Trang chủ */}
          <Route index element={<HomePage />} />
          <Route path="/playlists" element={<PlaylistListPage />} />
          <Route path="/djs" element={<DJListPage />} />
          <Route path="/genre/:genreName" element={<GenrePage />} />
          <Route path="/dj/:djId" element={<DJPage />} />
          <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
          {/* Các route khác sẽ được thêm vào đây */}
          {/* Ví dụ:
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/my-playlist" element={<MyPlaylistPage />} />
          
          
          
          
          
          */}
          {/* Route mặc định nếu không khớp */}
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;