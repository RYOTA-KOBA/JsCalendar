// 年月日をyyyy/mm/dd/曜日で表示するfunction
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        dayOfTheWeek = d.getDay(),
        dayOfTheWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfTheWeek];

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    // 戻り値にyyyy/mm/dd/曜日を指定
    return [year, month, day, dayOfTheWeekStr].join('/');
}
// 日付の取得
const date = new Date();

const renderCalendar = () => {
    // 取得した月の日付を指定
    date.setDate(1);

    const monthDays = document.querySelector(".days");
    
    const lastDay = new Date(
        date.getFullYear(), 
        date.getMonth() + 1, 
        0
    ).getDate();
    
    // getMonthに+１しないのは前月だから
    const prevLastDay = new Date(
        date.getFullYear(), 
        date.getMonth(), 
        0
    ).getDate();
    
    const firstDayIndex = date.getDay();
    
    //取得した月の最終日の曜日を数値で取得
    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();
    
    // 同じ週で翌月に何日あるのかを取得
    const nextDays = 7 - lastDayIndex - 1;
    
    const months = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
    ];
    
    // h1タグ(.date h1)に月を取得し代入
    document.querySelector('.date h1').innerHTML
    = months[date.getMonth()];

    // 年月日曜日
    const today = new Date().toDateString();

    // pタグ(.date p)に年/月/日/曜日で表示
    document.querySelector('.date p').innerHTML
    = formatDate(today);

    let days = "";
    
    // 曜日の数値を1まで引いていき、div.prev-dateで表示,
    // 前月で同じ週の日にちを表示
    for(let x = firstDayIndex; x > 0; x--){
        // 配列で０スタートなので+1する
        days += `<div class="prev-date">${prevLastDay - x + 1}
        </div>`;
    }
    
    // 該当つきのlastDayまで数字(日にち)を代入
    // iと取得した日にちが等しいかつ取得したdateの月と現在の日時のから取得した月が等しい場合に
    // .todayクラスを付与
    for(let i = 1; i<= lastDay; i++){
        if(i === new Date().getDate() && 
        date.getMonth() === new Date().getMonth()){
            days += `<div class="today">${i}</div>`;
        }else{
            days += `<div>${i}</div>`;
        }
    }
    let hiniti = new Date().getDate();
    let prevMo = new Date().getMonth();

    console.log(hiniti);
    console.log(lastDay);
    console.log(prevMo);
    console.log(date.getMonth());

    for(let j = 1;j <= nextDays;j++){
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
}




document.querySelector(".prev").
addEventListener("click",()=>{
    date.setMonth(date.getMonth()-1);
    renderCalendar();
});
document.querySelector(".next").
addEventListener("click",()=>{
    date.setMonth(date.getMonth()+1);
    renderCalendar();
});

renderCalendar();
