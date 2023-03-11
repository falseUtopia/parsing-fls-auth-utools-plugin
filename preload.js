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
                    // .devTools()
                    .evaluate(() => {


                        let headerMainCon = document.getElementsByClassName("headerMainCon")[0];
                        headerMainCon.setAttribute("onmouseover", "document.getElementsByClassName('headerMainCon')[0].setAttribute('style' , 'z-index:102')")
                        headerMainCon.setAttribute("onmouseout", "document.getElementsByClassName('headerMainCon')[0].setAttribute('style' , 'z-index:100')")

                        // 整个页面
                        let allHtml = document.documentElement.innerHTML

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


                        let urlBoxBigDiv = document.getElementsByClassName("urlBoxBigDiv")
                        if (urlBoxBigDiv.length) {
                            urlBoxBigDiv[0].remove()
                        }

                        // 得到页面的第一个元素。
                        let firstElement = document.body.firstChild

                        urlBoxBigDiv = document.createElement("div")
                        urlBoxBigDiv.className = "urlBoxBigDiv"
                        urlBoxBigDiv.style = "position: fixed; z-index: 101"

                        let tipsNode = document.createElement("div");
                        tipsNode.innerHTML = `<div class="urlBox" style="width: 400px;cursor: pointer; display:table; position: relative;z-index: 101;">
                                                <span style="color: white;background-color: #030915;" >复制完成</span>
                                             </div>`
                        tipsNode.setAttribute("id", "tips")
                        tipsNode.setAttribute("style", "display: none;")
                        urlBoxBigDiv.appendChild(tipsNode)

                        for (let [i, url] of url_array.entries()) {

                            let html = `
                                <div class="urlBox" style="width: 400px;cursor: pointer; display:inline-block; position: relative;z-index: 101;">
                                    <span style="color: white;background-color: #030915;" onclick="
            
                                navigator.clipboard.writeText('` + url + `')
                                    .then(function() {
                                        document.getElementById('tips').setAttribute('style','display: table;')
                               
                                        setTimeout(()=>{
                                            document.getElementById('tips').setAttribute('style','display: none;')
                                        }, 1000);
                                    })
                 
                           ">` + (i + 1) + `  ` + url + ` <span style="text-decoration: underline">复制</span></span> </div>
                            `
                            let urlBoxDiv = document.createElement("div")
                            urlBoxDiv.innerHTML = html;
                            urlBoxDiv.style = "display:table;"
                            urlBoxBigDiv.appendChild(urlBoxDiv)

                        }

                        // 在 第一个元素之前插入
                        document.body.insertBefore(urlBoxBigDiv, firstElement);


                        // var url = a+"/rpc/prolongTicket.action"
                        // console.log(url)

                    })
                    .run()


            }
        }
    }
}

