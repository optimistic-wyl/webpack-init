import {common} from './common'
import $ from 'jquery'
import {style} from  './test.css'
console.log($, `first ${common}`)
$('#app div').addClass('test')

console.log(style)

document.getElementById('btn').onclick = function() {
  // import 启动懒加载
  // webpackChunkName: 'desc' 指定懒加载的文件名称
  // webpackPrefetch: true 启动预加载

  // import(/* webpackChunkName: 'desc', webpackPrefetch: true */'./dynamic-import/wp').then(({ desc }) => {
  //   alert(desc())
  // })

  import(/* webpackChunkName: 'desc' */'./dynamic-import/wp').then(({ desc }) => {
      alert(desc())
  })
}