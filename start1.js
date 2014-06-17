

/*
地面画像はタテ480px、横任意幅で作る。
同じ背景を横に2連続けたものを用意すれば横幅は適当でも
プログラム側で横幅を検出してループさせるため、
今後自由に背景画像として横に書き足していってよい
*/

var jimen_haba = 0;//地面画像の横幅px値
var enkei_haba = 0;//遠景画像の横幅px値



var sora_colorR = 255;
var sora_colorG = 255;
var sora_colorB = 255;


var arukinum = 1;//歩きモーションのステップ数
var jimen_num = jimen_haba * -1 / 2 ;//地面画像の表示pos 元画像の-1/2値
var enkei_num = enkei_haba * -1 / 2 ;//遠景画像の表示pos 元画像の-1/2値

var sora_step = 0;//空の色変化のステップ数




function test2()//メインループ
{

	shoki_haichi();

	setInterval("aruki()",350);

	setInterval("jimen_nagare()",20);

	setInterval("enkei_nagare()",200);

	setInterval("sora_iro()",100);
	
	setInterval("taiyou_hontai()",100);


}//function メイン関数



function taiyou_hontai()
{

  console.log(sora_step);
  
  var ta_x = sora_step * 5 / 6;
  
  var ta_y = (ta_x * ta_x * 14 / 3125 ) - ( 168 * ta_x / 125) + (104/5) ;

ta_y = Math.floor(ta_y);


	var ele = document.getElementById("img_taiyou");
	ele.style.position = 'absolute'; 
	ele.style.left = ta_x; 
	ele.style.top  = ta_y; 



}//function taiyou_hontai()











function sora_iro()
{

/*
空色を配列に格納するやり方では不自然な感じする。

R255:G255:B255
R20:G255:B255
R20:G20:B255
R20:G20:B20
R100:G100:B100
R255:G255:B255
の順でカラーコードを遷移させれば、空の色が滑らかに変化させれるのでないか

※.toString(16)で10進数を16進数に変換するのだが、
このとき対象となる10進数が16以下だと8などとなってしまい、
カラーコードとしての用途である08にならない。
ので、RGB値の下限を0ではなく20にする

sora_colorR,sora_colorG,sora_colorBで表現する。
sora_colorR.toString(16)で16進数に変える


*/

sora_step = sora_step + 1;
//朝～午前
if( 1 <= sora_step && sora_step <= 236)
{   sora_colorR = sora_colorR - 1;}
  
//日中  
if( 237 <= sora_step  && sora_step <= 471)
{   sora_colorG = sora_colorG - 1;}

//午後～夜
if( 472 <= sora_step  && sora_step <= 706)
{   sora_colorB = sora_colorB - 1;}
  
//夜～明け方  
if( 707 <= sora_step  && sora_step <= 800)
{    sora_colorR = sora_colorR + 2;
     sora_colorG = sora_colorG + 2;   
     sora_colorB = sora_colorB + 2; 
     }
     
//夜明け間際     
if( 801 <= sora_step  && sora_step <= 811)
{    sora_colorR = sora_colorR + 5;
     sora_colorG = sora_colorG +5;   
     sora_colorB = sora_colorB + 5; 
     }
     
if(sora_step >=812)
{   sora_colorR = 255;
    sora_colorG = 255;
    sora_colorB = 255;
    sora_step = 0;
    } 
    
/*
このことから、太陽は1で日の出、600で日没くらいのスパンで動くと予想される。
仮の太陽画像では、画像サイズに対して太陽の中心座標が、ｘ165、ｙ120
辺りにある。これは、フォトショップの情報ボックスで分かる。

1）初期配置で太陽の円が地平線にくるように調節する。

仮の処置として、一旦、遠景画像を非表示にする。
htmlのCSS部分でtopを0から1000にした。

2）600タイムカウント（100ミリ秒単位）で日没するような座標軌道を計算し、動かす。
太陽仮画像の
日出位置、x-100:y200（これは画像によって変わる）
日没位置、x400:y200
南中位置、x150:y-80

ここからは数学だ。
上記3点を通る2次曲線の方程式を求めなさい。

y = ax^2 + bx + c 

200 = 10000a - 100b + c
200 = 160000a + 400b + c
-80 = 22500a + 150b + c

10000a - 100b = 160000a + 400b
-500b = 150000a
b = -300a

200 - 10000a + 100b = -80 - 22500a - 150b
280 + 12500a = -250b

280 + 12500a = 75000a
62500a = 280
 
a = 280/62500 = 28/6250 = 14/3125
b = -300*14/3125 = -60*14/625 = -12*14/125 = -168/125

200 = 10000 * 14/3125 - 100 * -168/125 + c
200 = 2000 * 14/ 625 + 20 * 168 / 25 + c
200 = 400 * 14 / 125 + 4*168 / 5 + c
200 = 80 * 14/25 + 672/5 + c
c = 200 - 16*14/5 - 672/5
= 200 - ( 224 + 672) / 5
= 200 - 896/5 = 1000/5 - 896/5 = 104/5

∴y =  14/3125x^2 -168/125x + 104/5

ｘ座標は-100から+400まで動く
タイムラインは600かけて動く

ｘ座標が-100から始まって、タイムカウントが+1する度に、
ｘ座標が+5/6されて、対応するｙが上記関数で求められる





3）CSSではみでた部分をマスクする。

*/

var r16 = sora_colorR.toString(16);
var g16 = sora_colorG.toString(16);
var b16 = sora_colorB.toString(16);

var sora_color_code = "#" + r16 + "";
sora_color_code = sora_color_code +  g16 + "";
sora_color_code = sora_color_code +  b16 + "";



	var ele = document.getElementById("div_sora");
	ele.style.backgroundColor = sora_color_code;

}//function sora_iro()


function enkei_nagare()
{
	enkei_num = enkei_num + 1;

	if (enkei_num>0)
	{enkei_num = enkei_haba * -1 / 2;}

	var ele = document.getElementById("img_enkei");
	ele.style.position = 'absolute'; 
	ele.style.left = enkei_num + 'px'; 
 
}//function enkei_nagare()


function jimen_nagare()
{
	jimen_num = jimen_num + 1;

	/*
	地面ループの仕組み
	画像は最初、x座標がjimen_numの位置に表示される。
	jimen_numには元画像の横幅の-1/2値が初期値として設定される。
	jimen_numは1ずつ増えながら0になると初期値にもどる。
	つまり幅2000pxの画像なら、-1000から0までの移動をループする。
	それとは別に、画像を640×480のウィンドウでトリミングしている（CSS)

	この仕組みはフレームの表示位置を0,0にしているのでうまくいくが、
	例えば画面中央に作品を表示したい場合、
	現行の-1000→0のうごきを、-800→200などに調整しなければならない。
	（この場合、フレームは200,0から描画される
	*/

	if (jimen_num>0)//地面画像のループ指定。
	{jimen_num = jimen_haba * -1 / 2;}

	var ele = document.getElementById("img_jimen");
	ele.style.position = 'absolute'; 
	ele.style.left = jimen_num + 'px'; 
 
}//function jimen_nagare()



function aruki()
{
	arukinum = arukinum + 1;

	if (arukinum > 6){arukinum = 1;}

	var ele = document.getElementById("aruki");
	ele.src ="1-0" + arukinum + "_left.png";

}//function aruki()




function shoki_haichi()
{
	//主人公を初期配置
	var ele = document.getElementById("aruki");
	ele.style.position = 'absolute'; 
	ele.style.left = '290px'; 
	ele.style.top  = '140px'; 

	//地面（近景）png画像の横幅取得
	var ele = document.getElementById("img_jimen");
	jimen_haba = ele.width;

	//地面（遠景）png画像の横幅取得
	var ele = document.getElementById("img_enkei");
	enkei_haba = ele.width;
	
	//太陽を初期配置
	var ele = document.getElementById("img_taiyou");
	ele.style.position = 'absolute'; 
	ele.style.left = '-100px'; 
	ele.style.top  = '200px'; 

	
	
	

}//function shoki_haichi()







