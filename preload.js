//
//  Copyright (c) 2023. falseUtopia All rights reserved.
//      Licensed under BSD license
//
//  https://gitee.com/falseutopia/parsing-fls-auth-utools-plugin
//

window.exports = {
    "idea": {
        mode: "none",  // 用于无需 UI 显示，执行一些简单的代码

        args: {
            // 进入插件时调用
            enter: (action) => {

                window.utools.hideMainWindow()
                window.utools.outPlugin()

                console.log('插件装配完成')

                window.utools.ubrowser
                    .goto('https://fofa.info/result?qbase64=ImZscy1hdXRoIg%3D%3D')
                    .devTools()
                    .evaluate(() => {

                        // 得到页面的第一个元素。
                        let firstElement = document.body.firstChild
                        // 整个页面
                        let allHtml = document.documentElement.innerHTML;
                        // 获取地址的正则
                        let reg = /url=(.*?)\/auth/g;

                        let result;
                        let url_array = []
                        while ((result = reg.exec(allHtml)) != null) {
                            if (result[1]) {
                                url_array.push(result[1])
                            }
                        }

                        // 去重操作
                        url_array = Array.from(new Set(url_array))

                        for (let url of url_array) {
                            let html = `
              <div class="urlBox" style="cursor: pointer;position: relative;z-index: 10000;">
                <span style="color: white;background-color: #030915" onclick="navigator.clipboard.writeText('` + url + `').then(function() {})">` + url + ` 复制</span>
              </div>
              `
                            let devElement = document.createElement("div")
                            devElement.innerHTML = html;
                            // 在 第一个元素之前插入
                            document.body.insertBefore(devElement, firstElement);

                            // var url = a+"/rpc/prolongTicket.action"
                            // console.log(url)

                        }

                    })
                    .run()


            }
        }
    }
}

