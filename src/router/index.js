import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Own from '@/components/Own'
import MyMessage from "../components/MyMessage"
import Messagedetail from "../components/Messagedetail"
import lookHistoryVideo from "../components/lookHistoryVideo"
import ArticleComment from '../components/ArticleComment'
import videoDetail from '../components/videoDetail'
import otheruser from   '../components/otheruser'
import categoryArticle from "../components/categoryArticle"
import MyGuanzhu from "../components/MyGuanzhu";
import AllVideo from "../components/AllVideo";
import Login from "../components/Login";
import Login1 from "../components/Login1";
import Caijian from "../components/Caijian";
import Zhuce from "../components/Zhuce";
import shoucang from "../components/shoucang";
import fabu from "../components/fabu";
import Video from "../components/Video";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login1',
      name: 'Login1',
      component: Login1
    },
    {
      path: '/Caijian',
      name: 'Caijian',
      component: Caijian
    },
    {
      path: '/Zhuce',
      name: 'Zhuce',
      component: Zhuce
    },
    {
      path: '/Own',
      name:'Own',
      component: Own
    },
    {
      path:'/MyMessage',
      name:'MyMessage',
      component:MyMessage
    },
    {
      path:'/Messagedetail',
      name:'Messagedetail',
      component:Messagedetail
    },
    {
      path:'/lookHistoryVideo',
      name:'lookHistoryVideo',
      component:lookHistoryVideo
    },
    {
      path:'/ArticleComment',
      name:'ArticleComment',
      component:ArticleComment
    },
    {
      path:'/videoDetail',
      name:'videoDetail',
      component:videoDetail
    },
    {
      path:'/otheruser',
      name:'otheruser',
      component:otheruser
    },
    {
      path:'/categoryArticle',
      name:'categoryArticle',
      component:categoryArticle
    },
    {
      path:'/MyGuanzhu',
      name:'MyGuanzhu',
      component:MyGuanzhu
    },
    {
      path:'/AllVideo',
      name:'AllVideo',
      component:AllVideo
    },
    {
      path:'/shoucang',
      name:'shoucang',
      component:shoucang
    },
    {
      path:'/fabu',
      name:'fabu',
      component:fabu
    },
    {
      path:'/Video',
      name:'Video',
      component:Video
    }
  ]
})
