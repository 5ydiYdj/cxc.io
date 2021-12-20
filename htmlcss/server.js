
//页面跳转方法
function ToIndexPage(){
    window.location.href = './index.html';
}
function ToTestPage(){
    window.location.href = './wordTest.html';
}
function ToRandomPage(){
    window.location.href = './randomWord.html';
}
function ToReviewPage(){
    window.location.href = './reviewWord.html';
}

//测试区域显示单词和选项的方法
function TestFunction(number){
    changeBackgroundColor("white","#chioce1");
    changeBackgroundColor("white","#chioce2");
    changeBackgroundColor("white","#chioce3");
    targetWord = getWord(number);
    faultWord1 = getWordCard();
    faultWord2 = getWordCard();
    showData(targetWord.content,"#Target");
    let n = parseInt(Math.random()*3)+1;
    if(n == 1){
        showData(targetWord.chinese,"#chioce1");
        showData(faultWord1.chinese,"#chioce2");
        showData(faultWord2.chinese,"#chioce3");
        
    }
    if(n == 2){
        showData(targetWord.chinese,"#chioce2");
        showData(faultWord1.chinese,"#chioce1");
        showData(faultWord2.chinese,"#chioce3");
    }
    if(n == 3){
        showData(targetWord.chinese,"#chioce3");
        showData(faultWord1.chinese,"#chioce2");
        showData(faultWord2.chinese,"#chioce1");
    }
}

var word;
//展示单词细节
function ToShowPage(word){
    let showPage = document.createElement("div");
    let close = document.createElement("div");
    showPage.id = "showPage";
    close.id = "popWindowClose";
    let content = document.createElement("div");
    content.innerHTML = "<div id='wordContent'>"+word.content+"</div>"+
                        "<div id='translation'>"+word.pronunciation+
                        word.chinese+"</div>";
                        
    showPage.appendChild(content);
    showPage.appendChild(close);
    close.onmouseover = function(){
        close.style.cssText = "animation-play-state: running;";
    }
    close.onmouseout = function(){
        close.style.cssText = "animation-play-state: paused;";
    }
    document.body.appendChild(showPage);
    close.onclick = function (){
        document.body.removeChild(showPage);
    }
    console.log(word);
}
//提示复习完毕
function ToShowTips(){
    let showPage = document.createElement("div");
    let close = document.createElement("div");
    showPage.id = "showPage";
    close.id = "popWindowClose";
    let content = document.createElement("div");
    content.innerHTML = "<div id='wordContent'>已经复习完毕</div>"+
                        "<div id='translation'>记得保存测试点</div>";
                        
    showPage.appendChild(content);
    showPage.appendChild(close);
    close.onmouseover = function(){
        close.style.cssText = "animation-play-state: running;";
    }
    close.onmouseout = function(){
        close.style.cssText = "animation-play-state: paused;";
    }
    document.body.appendChild(showPage);
    close.onclick = function (){
        document.body.removeChild(showPage);
    }
}
function ToShowTips1(num){
    console.log(num);
    let showPage = document.createElement("div");
    let close = document.createElement("div");
    showPage.id = "showPage";
    close.id = "popWindowClose";
    let content = document.createElement("div");
    content.innerHTML = "<div id='wordContent'>已经保存</div>";
                        
    showPage.appendChild(content);
    showPage.appendChild(close);
    close.onmouseover = function(){
        close.style.cssText = "animation-play-state: running;";
    }
    close.onmouseout = function(){
        close.style.cssText = "animation-play-state: paused;";
    }
    document.body.appendChild(showPage);
    close.onclick = function (){
        document.body.removeChild(showPage);
    }
}
//单词卡获得单词方法
function getWordCard(){
    let Num = parseInt(Math.random()*5000)+1;
    return WordsObjArray(en6)[Num];
}
//直接获得单词方法
function getWord(num){
    return WordsObjArray(en6)[num];
}
var faultIndex = [];
const faultTempt = new Set();//存放记错单词
//顺序点击选项事件处理
function AnswerEvent(answer,id){

    if(answer == targetWord.chinese){
        number++;
        if(number > 5000){
            number = 5000;
            ToShowTips();
        }
        setTimeout(TestFunction(number),1000);
    }else{    
        faultTempt.add(number);
        changeBackgroundColor("red","#"+id);
    }

}
//复习点击选项事件处理
function AnswerEventByReview(answer,id){

    if(answer == targetWord.chinese){
        i++;
        number = array[i];
        if(i >= array.length){
            number = array.length;
            ToShowTips();
        }
        if(number > 5000){
            number = 5000;
            ToShowTips();
        }
        TestFunction(number);       
    }else{    
        faultTempt.add(number);
        changeBackgroundColor("red","#"+id);
    }

}
//顺序背单词保存标记点和选择错误单词下标
function SaveRememberPoint(num){
    faultIndex = SetToArray(faultTempt);
    SetCookie("上次记忆到第几个单词",num);
    SetCookie("上次没记住的单词的下标",JSON.stringify(faultIndex));
    ToShowTips1(1);
}
//随机记单词保存选择错误单词下标
function SaveRememberPointByRandom(num){
    faultIndex = SetToArray(faultTempt);
    // SetCookie("上次随机到第几个单词",num);
    SetCookie("上次随机没记住的单词的下标",JSON.stringify(faultIndex));
    ToShowTips1(1);
}
//复习记单词保存选择错误单词下标
function SaveRememberPointByReview(num){
    faultIndex = SetToArray(faultTempt);
    // SetCookie("上次随机到第几个单词",num);
    SetCookie("上次复习没记住的单词的下标",JSON.stringify(faultIndex));
    ToShowTips1(1);
}

//随机记单词,下一个单词显示
function RandomRememberWord(){
    number = parseInt(Math.random()*5000)+1;
    TestFunction(number);
}

//设置cookie和获得cookie
function SetCookie(name,value){
    var expdate = new Date();//初始化时间
    expdate.setTime(expdate.getTime() + 24*60*60*1000);
    document.cookie = name+"="+value+";path=/";
}
function GetCookie(c_name){
    if (document.cookie.length>0){
        c_start=document.cookie.indexOf(c_name + "=")
        if (c_start!=-1)
            { 
            c_start=c_start + c_name.length+1 
            c_end=document.cookie.indexOf(";",c_start)
            if (c_end==-1) c_end=document.cookie.length
            return unescape(document.cookie.substring(c_start,c_end))
        } 
    }
    return ""
}
//集合转变成数组
function SetToArray(obj){
    let Result = [];
    let j = 0;
    obj.forEach(function(element){
        Result[j] = element;
        j++
    })
    return Result;
}
var words = WordsObjArray(en6);
//搜索功能函数
function SearchWord(){
    let inputElement = document.createElement("input");
    let inputElement1 = document.createElement("button");
    inputElement.value="请输入要查询的单词";
    inputElement1.textContent ="search";
    inputElement.onmousedown = function (){
        inputElement.value = "";
    }
    inputElement1.onclick = function (){
        let content = inputElement.value;
        for(let i = 0; i < words.length; i++){
            if(content == words[i].content){
                ToShowPage(words[i]);
                console.log(words[i]);
                break;  
            }
        }
    }
    document.querySelector("#search").appendChild(inputElement);
    document.querySelector("#search").appendChild(inputElement1);
}
function SearchWordPlus(){
    let btn_input = document.querySelector(".btn-search");
    btn_input.onclick = function(){
        let input = document.querySelector(".input-search");
            for(let i = 0; i < words.length; i++){
                if(input.value == words[i].content){
                    ToShowPage(words[i]);
                    break;  
                }
            }
    }
}
function ExitEvent(){
    let btn_exit = document.querySelector(".exit");
    btn_exit.onclick = function(){
        ToIndexPage();
    }
}


