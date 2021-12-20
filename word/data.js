
function word(content,pronunciation,chinese,date){
    this.content = content;
    this.pronunciation = pronunciation;
    this.chinese = chinese;
}
function date(date,num){
    this.date = date;
    this.num = num
}

function WordsObjArray(en6){
    Result = [];
    for(let i = 0;i < en6.length;i++){
        temp = en6[i].split('/');
        Result[i] = new word(temp[0],temp[1],temp[2]);
    }
    return Result;
}

function ObjArrayToArray(en6ObjArray){
    let json = JSON.stringify(en6ObjArray);
    return json;
}

function JsonToObjArray(json){
    let obj;
    obj = JSON.parse(json);
    return obj; 
}