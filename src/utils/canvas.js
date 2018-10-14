export const canvasScore = (ctx, getScore, getTime) => {
    //初始化-预定义
    var creditTxt = '', mathVal = '';
    var colTxt = "#fff", colLig = '#fff', colBg = '#fff';
    //根据分类来确定每一个需要的颜色、文字和位置
    //其实位置阶梯过度值(mathVal)：140--168--216--264--312--360间隔48,将分比例计算出来需要当前分类的位置（各个阶段值总分差不一样需要注意）
    if (getScore <= 350) {
        creditTxt = "较差";
        mathVal = 120;
    } else if (getScore > 350 && getScore < 550) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "较差";
        mathVal = 140 + (getScore - 350) / 200 * 48;
    } else if (getScore >= 550 && getScore < 600) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "中等";
        mathVal = 168 + (getScore - 550) / 50 * 48;
    } else if (getScore >= 600 && getScore < 650) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "良好";
        mathVal = 216 + (getScore - 600) / 50 * 48;
    } else if (getScore >= 650 && getScore < 700) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "优秀";
        mathVal = 264 + (getScore - 650) / 50 * 48;
    } else if (getScore >= 700 && getScore < 950) {
        // colTxt = "#fff";
        // colLig = "#fff";
        // colBg = "#fff";
        creditTxt = "极好";
        mathVal = 312 + (getScore - 700) / 250 * 48;
    } else if (getScore >= 950) {
        creditTxt = "极好";
        mathVal = 312 + (250) / 250 * 48;
    } else {
        console.log('分数不在正常范围内');
    }
    //画外环
    ctx.beginPath();
    // ctx.lineCap="round";
    ctx.lineWidth = 1;
    ctx.arc(150, 140, 70, 0.84 * Math.PI, 0.16 * Math.PI);
    ctx.strokeStyle = colBg;
    ctx.stroke();
    //画外环
    ctx.beginPath();
    // ctx.lineCap="round";
    ctx.lineWidth = 1;
    ctx.arc(150, 140, 90, 0.84 * Math.PI, 0.16 * Math.PI);
    ctx.strokeStyle = colBg;
    ctx.stroke();
    //画内环
    ctx.beginPath();
    // ctx.lineCap="round";
    ctx.lineWidth = 15;
    ctx.arc(150, 140, 120, 0.835 * Math.PI, 0.165 * Math.PI);
    ctx.stroke();
    //文字-刻度-line
    // ctx.strokeStyle = '#fff';
    // ctx.lineWidth = 1;
    // ctx.beginPath();
    // ctx.moveTo(25,160);
    // ctx.lineTo(150,150);
    // ctx.lineTo(140,35);
    // ctx.moveTo(310,35);
    // ctx.lineTo(150,150);
    // ctx.lineTo(425,160);
    // ctx.stroke();
    //文字-信用度
    ctx.textAlign = "center";
    // ctx.textBaseline = 'hanging'
    ctx.font = "400 14px Arial";
    ctx.fillStyle = colTxt;
    ctx.fillText('信用' + creditTxt, 150, 190);
    //文字-信用数
    ctx.font = "600 35px Arial";
    ctx.fillText(getScore, 150, 150);
    //文字-查询时间
    ctx.font = "200 14px Arial";
    ctx.fillStyle = colLig;
    ctx.fillText('评估时间:' + getTime, 150, 220);

    //文字-刻度
    ctx.font = "200 12px Arial";
    ctx.translate(150, 140);
    ctx.textBaseline = "top";
    var gradText = ['350', '较差', '550', '中等', '600', '良好', '650', '优秀', '700', '极好', '950'];
    for (var i = 0; i < gradText.length; i++) {
        //第一次旋转值是绝对位置(相较原始顶点位置)，第二次旋转相对位置(相较上一次)
        if (i == 0) {
            ctx.rotate(240 * Math.PI / 180);
        } else {
            ctx.rotate(24 * Math.PI / 180);
        }
        //判断奇偶数，颜色有区别
        if (i % 2 == 0) {
            ctx.fillStyle = colTxt;
        } else {
            ctx.fillStyle = colLig;
        }
        //进行填值 半径185
        ctx.fillText(gradText[i], 0, -110);
    }
    //标识当前位置
    ctx.beginPath();
    ctx.fillStyle = colTxt;
    ctx.shadowBlur = 7;
    ctx.shadowColor = colTxt;
    ctx.rotate(mathVal * Math.PI / 180);
    ctx.arc(0, -90, 5, 0, 2 * Math.PI);
    ctx.fill();
};