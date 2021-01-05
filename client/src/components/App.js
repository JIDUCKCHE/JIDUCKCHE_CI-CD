import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch } from "react-router-dom"
import Auth from "../hoc/auth"
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import UploadPage from "./views/UploadPage/UploadPage";
import MyPage from './views/MyPage/MyPage';
import EntUploadPage from './views/EntUploadPage/EntUploadPage';
import ArtistUploadPage from './views/ArtistUploadPage/ArtistUploadPage';
import ProdDetailPage from './views/ProdDetailPage/ProdDetailPage';
import ArtistDetailPage from './views/ArtistDetailPage/ArtistDetailPage';
import ProdModifyPage from './views/ProdModifyPage/ProdModifyPage'
import NewProdPage from './views/NewProdPage/NewProdPage'
import RankingPage from './views/RankingPage/RankingPage';
import PolicyPage from './views/PolicyPage/PolicyPage'
import NoticePage from './views/NoticePage/NoticePage'
import NoticeDetailPage from './views/NoticeDetailPage/NoticeDetailPage'
import UploadNoticePage from './views/UploadNoticePage/UploadNoticePage';
import Footer from "./views/Footer/Footer";
import NoticeModifyPage from './views/NoticeModifyPage/NoticeModifyPage';

function App() {

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null, false)} />
          <Route exact path="/login" component={Auth(LoginPage, false, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false, false)} />
          <Route exact path="/upload" component={Auth(UploadPage, true, false)} />
          <Route exact path="/myPage" component={Auth(MyPage, true, false)} />
          <Route exact path="/uploadEnt" component={Auth(EntUploadPage, true, true)} />
          <Route exact path="/uploadArtist" component={Auth(ArtistUploadPage, true, true)} />
          <Route exact path="/prod/:prodId" component={Auth(ProdDetailPage, null, false)} />
          <Route exact path="/artist/:artistId" component={Auth(ArtistDetailPage, null, false)} />
          <Route exact path="/modify/:prodId" component={Auth(ProdModifyPage, true, false)} />
          <Route exact path="/newProd" component={Auth(NewProdPage, null, false)} />
          <Route exact path="/ranking" component={Auth(RankingPage, null, false)} />
          <Route exact path="/policy" component={Auth(PolicyPage, null, false)} />
          <Route exact path="/notice" component={Auth(NoticePage, null, false)} />
          <Route exact path="/notice/modify/:noticeId" component={Auth(NoticeModifyPage, true, true)} />
          <Route exact path="/notice/:noticeId" component={Auth(NoticeDetailPage, null, false)} />
          <Route exact path="/uploadNotice" component={Auth(UploadNoticePage, true, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
