
/*
目的：雲を計算により描画したい。
手段：不定形曲線を制御下におきつつ描きたい

開始点Aと、目的点Bを設定した場合、
その２点間に直線を引くのは容易である。

しかし、その2点間に適度な複雑さを維持しつつ、
実行するたびに形状の変わるランダムな曲線（もちろん線形性は保たれる）
を描くにはどうしたらよいか。

これがしばらくのテーマになる。




*/


	var st_x = new Array();
var st_y = new Array();

var juryoku = new Array();	
			
			
			
st_x[1] = 200;//雲の格子点1
 st_y[1] = 220;
	
  st_x[2] = 360;//雲の格子点2
st_y[2] = 218;
	
 st_x[3] = 380;//雲の格子点3
st_y[3] = 180;
	
 st_x[4] = 355;//雲の格子点4
 st_y[4] = 155;
	
 st_x[5] = 300;//雲の格子点5
 st_y[5] = 135;
	
 st_x[6] = 270;//雲の格子点6
 st_y[6] = 105;
	
 st_x[7] = 230;//雲の格子点7
 st_y[7] = 100;
	
 st_x[8] = 190;//雲の格子点8
 st_y[8] = 180;			
			
  
  //8点に重力を設定する
juryoku[1] = 10000;
juryoku[2] = 10000;
juryoku[3] = 10000; 
juryoku[4] = 10000; 
juryoku[5] = 10000;
juryoku[6] = 10000;
juryoku[7] = 10000; 
juryoku[8] = 10000;   	
				
			
			


//以下、CANVAS記述

function draw_taiyou1() {
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
  
  

  
  
  
  
  
  
  for(var i = 1; i <= 8; i++){
  	ctx.beginPath();
  	
  
  	
  ctx.arc(st_x[i], st_y[i], 5, 0, Math.PI*2, false);
  
  
	ctx.closePath(); 
	  ctx.stroke();
	  
	  }//for i
	  
	  
	  
for (var m = 1;m<=8;m++){


  
  //重力は距離の2乗に反比例する
  
  //格子点1に対しては、格子点2～8までの7点の（1/距離＾2）*重力がかかる
  
var juto1 = new Array();
  
  var max_ju = 0;
  var max_ju_num = 0 ;
  
  for (var j = 1; j<=8;j++)
  {
    //格子点1と格子点2～8の距離の2乗
    
    if(m == j){}else{
    
    var kyori2 = ((st_x[m] - st_x[j]) * (st_x[m] - st_x[j])) + ((st_y[m] - st_y[j]) * (st_y[m] - st_y[j]));
   
   //格子点2～8から格子点1へ向かう重力
     juto1[j] = (1/kyori2) * juryoku[j];
    
   if(max_ju < juto1[j] ){  
   
    max_ju = juto1[j];//max_juが更新されたら上書きする
    max_ju_num = j ;//そのときの格子番号を保存
    
    }
    
    }//else
  
  }//for j
  
  
  
  
  //その中で一番大きいやつにひっぱられて近づく。
  
  
 //格子点1は、格子点（ max_ju_num）に近づく
 
 
 

  
  var a = ((st_y[max_ju_num] - st_y[m]) / (st_x[max_ju_num] - st_x[m])) * ((st_y[max_ju_num] - st_y[m]) / (st_x[max_ju_num] - st_x[m]));
  
  
  a = a + 1;
  
  var x2 = max_ju * max_ju / a;
  
  var x1 = Math.sqrt(x2);
  
  x1 = Math.floor(x1);
  
  var y1 = ((st_y[max_ju_num] - st_y[m]) / (st_x[max_ju_num] - st_x[m])) * x1;
  
  y1 = Math.floor(y1);
  




var kyori2 = ((st_x[m] - st_x[max_ju_num]) * (st_x[m] - st_x[max_ju_num])) + ((st_y[m] - st_y[max_ju_num]) * (st_y[m] - st_y[max_ju_num]));

  var max_ju2 = max_ju * max_ju;
  
  if( kyori2 <= max_ju2){
  
   st_x[m] = st_x[max_ju_num] + 1;
  st_y[m] = st_y[max_ju_num] + 1;
  }
  else
  {
  
    //カンバスの場合、左上が第一象限になることに注意
  
  st_x[m] = st_x[m] - x1;
  
st_y[m] = st_y[m] - y1;
  
  }



  
  
}//for m
  
  
}//draw



//以上、CANVAS記述










function test2()//メインループ
{


	setInterval("draw_taiyou1()",150);
	



}//function メイン関数

















