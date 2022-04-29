import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import VideoPlayer from './components/video-player/video-player';
import Home from './components/home/home.component';
import EditOrCreateVideoForm from './components/edit-or-create-video-form/edit-or-create-video-form';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="watch/:id" element={<VideoPlayer />} />
        <Route path="edit-video/:id" element={<EditOrCreateVideoForm mode='edit' />} />
        <Route path="create-video" element={<EditOrCreateVideoForm mode='add' />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
