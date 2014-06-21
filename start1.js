

/*
背景画像はタテ480px、横任意幅で作る。
同じ背景を横に2連続けたものを用意すれば横幅は適当でも
プログラム側で横幅を検出してループさせるため、
今後自由に背景画像として横に書き足していってよい
*/


//以下、グローバル変数置き場

	var arukinum = 1;//歩きモーションのステップ数

	var sora_colorR = 255;
	var sora_colorG = 255;
	var sora_colorB = 255;

	var jimen_haba = 0;//地面画像の横幅px値
	var enkei_haba = 0;//遠景画像の横幅px値

	var jimen_num = jimen_haba * -1 / 2 ;//地面画像の表示pos 元画像の-1/2値
	var enkei_num = enkei_haba * -1 / 2 ;//遠景画像の表示pos 元画像の-1/2値

	var time_count = 0;
	//100ミリ秒カウンタ。空色変化、太陽周期などメインループ全体の共用タイムカウントとして援用している
	//空色変化のファンクション内でカウンタ+を行っている。

//以上、グローバル変数置き場


//以下、CANVAS記述

function draw_taiyou() {
  /* canvas要素のノードオブジェクト */
  var canvas = document.getElementById('canvassample');
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  
  
   /*画面をCLS */
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.clearRect(0, 0, 640, 480);
  ctx.stroke();
    ctx.fill();
  
	/*太陽の中心座標を計算 */
	var ta_x = time_count * 5 / 6 + 100;//末項の+100は太陽の初期表示ｘ座標。これがないと√が虚数になる
		  
	var rootinto = (ta_x * 700 ) - ( ta_x * ta_x ) - (60000) ;//円の一般公式。計算過程はカンバスメモ
	rootinto = Math.ceil(rootinto);
	var ta_y =300- Math.sqrt(rootinto) ;
	  
	ta_y = Math.round(ta_y);
	ta_x = Math.round(ta_x);
  
   
	/* 太陽描画 */
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	  
	ctx.strokeStyle = 'rgba(255, 255, 255,0)'; //図形の輪郭線を透明にしろ
	      
		/* グラデーション領域をセット */
		var grad  = ctx.createRadialGradient(ta_x,ta_y,1,ta_x,ta_y,40); //半径1の円から40の円の領域でグラデしろ
		  
		/* グラデーション終点のオフセットと色をセット */
		grad.addColorStop(0.3,'white');      // グラデの中心色。「白から」
		
		
		
		var taiyou_colorR =  255;
				var taiyou_colorG =  255;
						var taiyou_colorB =  255;
		
		if( time_count >= 400 && time_count <= 446){
		
			taiyou_colorB =  taiyou_colorB - 5;
			taiyou_colorG =  taiyou_colorG - 1;
		
			var edgecolor2 = "rgba("+taiyou_colorR+", "+taiyou_colorG+", "+taiyou_colorB+",1)";// 「空色にグラデしろ」RGB値を指定するときは一旦変数を経由
	
		
			grad.addColorStop(0.3,edgecolor2); }
			
			if( time_count >= 447 ){
			
			
				grad.addColorStop(0.3,'orange');  
					taiyou_colorR =  255;
			taiyou_colorG =  255;
					taiyou_colorB =  255;
				
			
			}		

		  
		var edgecolor1 = "rgba("+sora_colorR+", "+sora_colorG+", "+sora_colorB+",0.6)";// 「空色にグラデしろ」RGB値を指定するときは一旦変数を経由
		grad.addColorStop(1,edgecolor1); 

		/* グラデーションをfillStyleプロパティにセット */
		ctx.fillStyle = grad;  
	  
	ctx.arc(ta_x, ta_y,40, 0, Math.PI*2, false);　//「円を」
	

	ctx.stroke();//「strokeStyleでかけ」
	ctx.fill();//「fillStyleで塗りつぶせ」	
	
	

	
	//光線描画
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	  
	ctx.strokeStyle = 'rgba(255, 255, 255,0)'; //図形の輪郭線を透明にしろ


//光線の長さ変数
	var kousen_nagasa = (400 - ta_x)* (ta_x - 100);
	var kousen_nagasa_abs = Math.abs(kousen_nagasa);

	kousen_nagasa = kousen_nagasa + kousen_nagasa_abs ;
	kousen_nagasa = kousen_nagasa / 450 ;

	
//多角形による光線描画

    //右横	
    ctx.moveTo(ta_x-2,ta_y-2);
    ctx.lineTo(ta_x+2,ta_y+2);
    ctx.lineTo(ta_x+kousen_nagasa*0.6,ta_y-kousen_nagasa*0.6);
    ctx.closePath();
     
    //左横
    ctx.moveTo(ta_x-2,ta_y-2);
    ctx.lineTo(ta_x+2,ta_y+2);
    ctx.lineTo(ta_x-kousen_nagasa*0.6,ta_y+kousen_nagasa*0.6);
    ctx.closePath();  
      
    //左上
    ctx.moveTo(ta_x+2,ta_y-2);
    ctx.lineTo(ta_x-2,ta_y+2);
    ctx.lineTo(ta_x+kousen_nagasa*1.8,ta_y+kousen_nagasa*1.8);
    ctx.closePath();  
     
    //右下
    ctx.moveTo(ta_x-2,ta_y+2);
    ctx.lineTo(ta_x+2,ta_y-2);
    ctx.lineTo(ta_x-kousen_nagasa*1.8,ta_y-kousen_nagasa*1.8);
    ctx.closePath();  
      
      
      
    //真上真下真右真左を短く明滅させ、夕刻には光線長を0にする
    var kousen_nagasa_tate = Math.sin(kousen_nagasa) * 30;
      
    //真上
    ctx.moveTo(ta_x-2,ta_y);
    ctx.lineTo(ta_x+2,ta_y);
    ctx.lineTo(ta_x,ta_y-kousen_nagasa_tate);
    ctx.closePath();  
     
    //真下
    ctx.moveTo(ta_x-2,ta_y);
    ctx.lineTo(ta_x+2,ta_y);
    ctx.lineTo(ta_x,ta_y+kousen_nagasa_tate);
    ctx.closePath();  
      
      //真右
    ctx.moveTo(ta_x,ta_y-2);
    ctx.lineTo(ta_x,ta_y+2);
    ctx.lineTo(ta_x+kousen_nagasa_tate,ta_y);
    ctx.closePath();  
     
      //真左
    ctx.moveTo(ta_x,ta_y-2);
    ctx.lineTo(ta_x,ta_y+2);
    ctx.lineTo(ta_x-kousen_nagasa_tate,ta_y);
    ctx.closePath();  
          
      
      
      
    	   

		// グラデーション領域をセット
		var grad  = ctx.createRadialGradient(ta_x,ta_y,1,ta_x,ta_y,200); //半径1の円から40の円の領域でグラデしろ
		  
		// グラデーション終点のオフセットと色をセット 
		grad.addColorStop(0.3,'white');      // グラデの中心色。「白から」
		  
		var edgecolor1 = "rgba("+sora_colorR+", "+sora_colorG+", "+sora_colorB+",0.6)";// 「空色にグラデしろ」RGB値を指定するときは一旦変数を経由
		grad.addColorStop(1,edgecolor1); 

		// グラデーションをfillStyleプロパティにセット
		ctx.fillStyle = grad;  
		 
      
       //光線描画
       ctx.stroke();
       ctx.fill();
      
	
  
}//draw


//以上、CANVAS記述


function test2()//メインループ
{

	shoki_haichi();

	setInterval("aruki()",350);

	setInterval("jimen_nagare()",20);

	setInterval("enkei_nagare()",200);

	setInterval("sora_iro()",100);
	
	setInterval("draw_taiyou()",100);


}//function メイン関数





function sora_iro()
{
	/*
	2日目にカラーコードを配列に格納して変化させる方法を実装したが、
	滑らかでなかった。
	RGB値の数値変化なら無段階変化を実現できる。

	R255:G255:B255
	R20:G255:B255
	R20:G20:B255
	R20:G20:B20
	R100:G100:B100
	R255:G255:B255
	の順でカラーコードを遷移させる。

	※.toString(16)で10進数を16進数に変換するのだが、
	このとき対象となる10進数が16以下だと8などとなってしまい、
	カラーコードとしての用途である08にならない。
	それだけのために0を足すのも面倒なので、RGB値の下限を0ではなく20にする

	sora_colorR,sora_colorG,sora_colorBで表現する。
	sora_colorR.toString(16)で16進数に変える
	*/

	time_count = time_count + 1;
	
	

	
	//朝～午前
	if( 1 <= time_count && time_count <= 236)
	{   sora_colorR = sora_colorR - 1;}
	  
	//日中  
	if( 237 <= time_count  && time_count <= 353)
	{   sora_colorG = sora_colorG - 2;

	}
	
	
	

	if( 354 <= time_count  && time_count <= 379)
	{   sora_colorR = sora_colorR + 9;
	     
 
	}
	
	if( 380<= time_count  && time_count <= 437)
	{   
	    sora_colorB =  sora_colorB - 4; 
	

	}	
	
	if( 438<= time_count  && time_count <= 482)
	{   
	    sora_colorG =  sora_colorG + 4; 
	

	}	
		
	
	
	
	if( 483 <= time_count  && time_count <= 515)
	{   sora_colorR = 255;
	     sora_colorG =  200;   
	     sora_colorB =  20; 
	}
	
		

	console.log(time_count,sora_colorR,sora_colorG,sora_colorB);

	//午後～夜
	if( 516 <= time_count  && time_count <= 570)
	{   sora_colorR = sora_colorR - 2;
		     sora_colorG =  sora_colorG - 1; 
		     
	}
	

	if( 571 <= time_count  && time_count <= 695)
	{   sora_colorR = sora_colorR - 1;
		     sora_colorG =  sora_colorG - 1; 
		     
	}	
	
	if( 696 <= time_count  && time_count <= 697)
	{   sora_colorR = 20;
sora_colorG = 20;
		 sora_colorB = 20;    
	}		
	
	//夜～明け方  
	if( 698 <= time_count  && time_count <= 706)
	{    sora_colorR = sora_colorR + 1;
	     sora_colorG = sora_colorG + 1;   
	     sora_colorB = sora_colorB + 1; 
	     }	  
	  
	  
	  
	//夜～明け方  
	if( 707 <= time_count  && time_count <= 800)
	{    sora_colorR = sora_colorR + 2;
	     sora_colorG = sora_colorG + 2;   
	     sora_colorB = sora_colorB + 2; 
	     }
	     
	//夜明け間際     
	if( 801 <= time_count  && time_count <= 811)
	{    sora_colorR = sora_colorR + 4;
	     sora_colorG = sora_colorG +4;   
	     sora_colorB = sora_colorB + 4; 
	     }
	     
	//朝に戻る     
	if(time_count >=812)
	{   sora_colorR = 255;
	    sora_colorG = 255;
	    sora_colorB = 255;
	    time_count = 0;
	    } 

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
	
	
	/*
	//太陽を初期配置
	var ele = document.getElementById("img_taiyou");
	ele.style.position = 'absolute'; 
	ele.style.left = '-100px'; 
	ele.style.top  = '200px'; 

	*/
	
	

}//function shoki_haichi()



	/*
	スクラップ置き場
	以下は、太陽をpng画像で用意して二次曲線上を動かすもの。
	これはこれで動いたが、これだと画像自体が変化していくアニメーションを実現できない。
	そこでCANVASで形状自体を計算描画させる方向に転換した。
	function taiyou_hontai()
	{
	  var ta_x = time_count * 5 / 6;
	  var ta_y = (ta_x * ta_x * 14 / 3125 ) - ( 168 * ta_x / 125) + (104/5) ;
	ta_y = Math.floor(ta_y);
		var ele = document.getElementById("img_taiyou");
		ele.style.position = 'absolute'; 
		ele.style.left = ta_x; 
		ele.style.top  = ta_y; 
	}//function taiyou_hontai()

	*/



	/*
	スクラップ置き場
	太陽画像を二次曲線に沿って動かす計画。今は無用になった。

	600タイムカウント（100ミリ秒単位）で日没するような座標軌道を計算し、動かす。
	太陽仮画像の
	日出位置、x-100:y200（これは画像によって変わる）
	日没位置、x400:y200
	南中位置、x150:y-80

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
	c = 200 - 16*14/5 - 672/5
	= 200 - 896/5 = 1000/5 - 896/5 = 104/5

	∴y =  14/3125x^2 -168/125x + 104/5

	ｘ座標は-100から+400まで動く
	タイムラインは600かけて動く

	ｘ座標が-100から始まって、タイムカウントが+1する度に、
	ｘ座標が+5/6されて、対応するｙが上記関数で求められる

	*/
	
	
	
	
	
	
	
	
	
