

/*
地面画像はタテ480px、横任意幅で作る。
同じ背景を横に2連続けたものを用意すれば横幅は適当でも
プログラム側で横幅を検出してループさせるため、
今後自由に背景画像として横に書き足していってよい
*/

var jimen_haba = 0;

var arukinum = 1;
var jimen_num = jimen_haba * -1 / 2 ;//地面画像の表示pos 元画像の-1/2値


function test2()
{

shoki_haichi();

setInterval("aruki()",350);

setInterval("jimen_nagare()",20);

}//function メイン関数


function jimen_nagare()
{
jimen_num = jimen_num + 1;


var roop =  jimen_haba / 2 - jimen_haba * 1 / 2 ;


if (jimen_num>roop)//地面画像のループ指定。
{jimen_num = jimen_haba * -1 / 2;}



var ele = document.getElementById("img_jimen");
ele.style.position = 'absolute'; 


ele.style.left = jimen_num + 'px'; 
 

}//function jimen_nagare()



function aruki()
{
arukinum = arukinum + 1;

if (arukinum > 6)
{
arukinum = 1;
}

var ele = document.getElementById("aruki");
ele.src ="1-0" + arukinum + "_left.png";


}//function aruki()




function shoki_haichi()
{
var ele = document.getElementById("aruki");
ele.style.position = 'absolute'; 
ele.style.left = '290px'; 
ele.style.top  = '140px'; 

var ele = document.getElementById("img_jimen");
ele.style.position = 'absolute'; 

jimen_haba = ele.width;

}//function shoki_haichi()







