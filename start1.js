

/*
地面画像はタテ480px、横任意幅で作る。
同じ背景を横に2連続けたものを用意すれば横幅は適当でも
プログラム側で横幅を検出してループさせるため、
今後自由に背景画像として横に書き足していってよい
*/

var jimen_haba = 0;//地面画像の横幅px値
var enkei_haba = 0;//遠景画像の横幅px値


var arukinum = 1;//歩きモーションのステップ数
var jimen_num = jimen_haba * -1 / 2 ;//地面画像の表示pos 元画像の-1/2値
var enkei_num = enkei_haba * -1 / 2 ;//遠景画像の表示pos 元画像の-1/2値

var sora_step = 0;//空の色変化のステップ数

    var sora_colorcode = [
        '#E0F2F7','#CEECF5','#A9E2F3','#81DAF5','#58D3F7',
        '#2ECCFA','#00BFFF','#01A9DB','#0174DF','#013ADF',
        '#045FB4','#DF7401','#B43104','#2A0A1B','#2A0A22',
        '#220A29','#120A2A','#0A122A','#0A2229','#0B2F3A',
        '#1C1C1C','#424242','#848484'       
    ];



function test2()//メインループ
{

	shoki_haichi();

	setInterval("aruki()",350);

	setInterval("jimen_nagare()",20);

	setInterval("enkei_nagare()",200);

	setInterval("sora_iro()",1000);


}//function メイン関数


function sora_iro()
{
	sora_step = sora_step + 1;

	if(sora_step > 23){sora_step = 0;}

	var ele = document.getElementById("div_sora");
	ele.style.backgroundColor = sora_colorcode[sora_step];

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

}//function shoki_haichi()







