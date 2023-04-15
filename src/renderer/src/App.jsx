import { createAgoraRtcEngine } from 'agora-electron-sdk'
// const { createAgoraRtcEngine } = require('agora-electron-sdk')
import { useEffect, useRef } from 'react'
import './css/index.css'

// asvasvas
const APPID = '9b676d1d995c4769a458bf8cb890412b'
const token =
  '007eJxTYOA23zRlxiWm14Iei9s3xiolrH0nt9xzjU9Pg3CBw96OQAkFBsskM3OzFMMUS0vTZBNzM8tEE1OLpDSL5CQLSwMTQ6OkjECrlIZARobELdUsjAwQCOKzMBgaGRsyMAAAr+EcKw=='
const channel = '1231'
const uid = 1231
let rtcEngine = null
let flag = false

function App() {
  const ref1 = useRef(null)
  const EventHandles = {
    // 监听本地用户加入频道事件
    onJoinChannelSuccess: ({ channelId, localUid }, elapsed) => {
      console.log('成功加入频道：' + channelId)

      // rtcEngine.enableVideo()
      rtcEngine.setupLocalVideo({
        view: ref1.current,
        uid: uid
      })
      // rtcEngine.enableVideo()
    },

    onLeaveChannel: ({ channelId, localUid }, stats) => {
      console.log('成功退出频道：' + channelId)
    },

    // 监听远端用户加入频道事件
    onUserJoined: ({ channelId, localUid }, remoteUid, elapsed) => {
      console.log('远端用户 ' + remoteUid + ' 已加入')
    }
  }

  const init = async () => {
    if (flag) {
      return
    }
    flag = true
    rtcEngine = createAgoraRtcEngine()
    // const sdkLogPath = resolve(homedir(), './test.log')
    // const sdkLogPath = './test.log'
    rtcEngine.initialize({
      appId: APPID
      // logConfig: { filePath: sdkLogPath }
    })
    // listen to events
    rtcEngine.registerEventHandler(EventHandles)

    rtcEngine.enableVideo()
    // Start preview before joinChannel
    rtcEngine.startPreview()

    // 设置频道场景为直播场景
    rtcEngine.setChannelProfile(1)

    // 设置用户角色，主播设为 ClientRoleBroadcaster，观众设为 ClientRoleAudience
    rtcEngine.setClientRole(1)

    // 使用临时 token 加入频道
    // 你需要自行指定用户 ID，并确保其在频道内的唯一性
    rtcEngine.joinChannel(token, channel, uid, {})
  }

  useEffect(() => {
    setTimeout(() => {
      init()
    }, 0)
  }, [])

  return (
    <div className="container">
      <div>2222</div>
      <div className="hello">
        <div className="video" id="local" ref={ref1}></div>
        <div className="video" id="remote"></div>
      </div>
      <div id="console"></div>
    </div>
  )
}

export default App
