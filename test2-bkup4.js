﻿
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


	var long_block = new Array();	//長辺方向へ、移動距離をブロック単位にランダム分割する
	var short_block = new Array();	//短辺方向へ、移動距離をブロック単位にランダム分割する			
				
	var long_pleats = new Array(400);  //始点終点間の距離400まで対応しますよ
	var short_pleats = new Array(400); 

	for (var i=0; i<= 400; i++){
		long_pleats[i] = new Array(5);  //2次元配列
		short_pleats[i] = new Array(5);
	}




//ブロックからプリーツを生成するためのランダムボード

//ブロック値0プリーツ
var pleats0 = [
  [0, 1, 2, 3, 4],
   
  [0, 0, 0, 0, 0], 
  [0, 1, 1, -1, -1], 
  [0, 1, -1, 1, -1], 
  [0, 1, -1, -1, 1],  
  [0, -1, 1, 1, -1],
   
  [0, -1, 1, -1, 1], 
  [0, -1, -1, 1, 1], 
  [0, 1, -1, 0, 0], 
  [0, 1, 0, -1, 0],    
  [0, 1, 0, 0, -1], 
  
  [0, -1, 1, 0, 0], 
  [0, -1, 0, 1, 0], 
  [0, -1, 0, 0, 1], 
  [0, 0, 1, -1, 0],    
  [0, 0, 1, 0, -1],
   
  [0, 0, -1, 1, 0], 
  [0, 0, -1, 0, 1], 
  [0, 0, 0, 1, -1], 
  [0, 0, 0, -1, 1]

];

//ブロック値1プリーツ
var pleats1 = [
  [0, 1, 2, 3, 4],
   
  [0, 1, 1, 0, -1], 
  [0, 1, 1, -1, 0], 
  [0, 1, 0, 1, -1], 
  [0, 1, 0, -1, 1],  
  [0, 1, -1, 0, 1],
   
  [0, 1, -1, 1, 0], 
  [0, 0, 1, 1, -1], 
  [0, 0, 1, -1, 1], 
  [0, 0, -1, 1, 1],    
  [0, -1, 1, 1, 0], 
  
  [0, -1, 1, 0, 1], 
  [0, -1, 0, 1, 1], 
  [0, 1, 0, 0, 0], 
  [0, 0, 1, 0, 0],    
  [0, 0, 0, 1, 0],
   
  [0, 0, 0, 0, 1]
];

//ブロック値2プリーツ
var pleats2 = [
  [0, 1, 2, 3, 4],
   
  [0, 1, 1, 0, 0], 
  [0, 1, 0, 1, 0], 
  [0, 1, 0, 0, 1], 
  
  [0, 0, 1, 1, 0],  
  [0, 0, 1, 0, 1],
   
  [0, 0, 0, 1, 1], 
  
  [0, 1, 1, 1, -1], 
  [0, 1, 1, -1, 1], 
  [0, 1, -1, 1, 1],    
  [0, -1, 1, 1, 1]
  
];
	
			
			
			
			
			
			
			
			


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
  
  
  
  	var s_x = 200;//始点座標
	var s_y = 100;
	var e_x = 280;//終点座標
	var e_y = 130;
  
  

	
	
	var x_distance = Math.abs(e_x - s_x);
	var y_distance = Math.abs(e_y - s_y);
	
	if( x_distance >= y_distance ){
	var long_distance = x_distance;;//目標への長辺距離
	var short_distance = y_distance;//目標への短辺距離
	}
	else{
	var long_distance = y_distance;
	var short_distance = x_distance;	
	}
	
	
	

	
	distance_to_pleats(long_distance);//long_pleats[1..8][1..4]に長辺方向のプリーツが生成された

	pleatsnum_to_pleats(long_distance,short_distance);//short_pleats[1..8][1..4]に短辺方向のプリーツが生成された
	

　　  
	var ctx = canvas.getContext('2d');
  	ctx.beginPath();
  	
  	
  	for(var i = 1; i<=long_distance; i++){
  	
  	  	for(var j = 1; j<=4; j++){
  	  	
  	  	s_x = s_x + long_pleats[i][j];
  	  	s_y = s_y + short_pleats[i][j];
  	  	
  	  	
  	  		ctx.strokeStyle = 'rgba(0, 0, 0,1)'; 
	ctx.moveTo(s_x,s_y);
	ctx.lineTo(e_x,e_y);
	ctx.closePath();  
	ctx.stroke();	
  	  	
  	  	
  	  	}//for j
  	
  	}//for i
  	
	
	    


	
  
}//draw

//以上、CANVAS記述


function distance_to_pleats(long_distance)
{

	
	//配列初期化
	for (var i = 0;i <= 100;i++)
	{


	long_block[i] = 1;
	
	long_pleats[i][0] = 0;
	long_pleats[i][1] = 0;
	long_pleats[i][2] = 0;
	long_pleats[i][3] = 0;
	long_pleats[i][4] = 0;
	long_pleats[i][5] = 0;
	
	short_pleats[i][0] = 0;
	short_pleats[i][1] = 0;
	short_pleats[i][2] = 0;
	short_pleats[i][3] = 0;
	short_pleats[i][4] = 0;
	short_pleats[i][5] = 0;

	} 
	


//long_distanceに対して、4割くらいの0ブロックが発生するとする。
	var zero_block = Math.floor(long_distance * 0.4);//0ブロックの個数
	
	
//long_distance個のブロック+1+2+0+2+2+0+0+1の生成
	
	for (var i = 1;i <= zero_block;i++)
	{

		var randnum = 1 + Math.floor( Math.random() * (long_distance) );
		
		if (long_block[randnum] == 1)
		{
		

		long_block[randnum] = 0;
		
		two_block(long_distance);
		}

	} 
	

	
	//1ブロックは4回の+-から出来ている。

	for ( var i = 1; i <= long_distance; i++)
	{
		if(long_block[i] == 0){
			var randnum0 = 1 + Math.floor( Math.random() * 19 );
			for( var j= 1; j <= 4; j++ ){
				long_pleats[i][j]=pleats0[randnum0][j];
				}
			}


		if(long_block[i] == 1){
			var randnum0 = 1 + Math.floor( Math.random() * 16 );	
			for( var j= 1; j <= 4; j++ ){
				long_pleats[i][j]=pleats1[randnum0][j];
				}
			
		}

		if(long_block[i] == 2){
			var randnum0 = 1 + Math.floor( Math.random() * 10 );
			for( var j= 1; j <= 4; j++ ){
				long_pleats[i][j]=pleats2[randnum0][j];
			}
		}


	}//for i
	//long_pleats[long_distance][1..4]にプリーツが格納された
	
	
}//function distance_to_pleats
	




function pleatsnum_to_pleats(long_distance,short_distance)
{

	for(var i = 1; i <= long_distance; i++)
	{
	short_block[i] = 0;
	}//for i
	
	
	for(var i = 1; i <= short_distance; i++)
	{
	
	var randnum = 1 + Math.floor( Math.random() * (long_distance) );
	
	if (short_block[randnum] < 2 ){   short_block[randnum] = short_block[randnum]+1;   }
	else
	{
		for(var j = 1; j <= long_distance; j++){
		
			if(short_block[j]  < 2 ){
				short_block[j] = short_block[j] + 1;
				break;
			}//if
		 
		}//for j
	}//else
	

	}//for i

	//ここまででブロック割りはできた。プリーツ生成は横のときのを流用できる


	//1ブロックは4回の+-から出来ている。

	for ( var i = 1; i <= long_distance; i++)
	{
		if(short_block[i] == 0){
			var randnum0 = 1 + Math.floor( Math.random() * 19 );
			for( var j= 1; j <= 4; j++ ){
				short_pleats[i][j]=pleats0[randnum0][j];
			}//for j
		}

		if(short_block[i] == 1){
			var randnum0 = 1 + Math.floor( Math.random() * 16 );	
			for( var j= 1; j <= 4; j++ ){
				short_pleats[i][j]=pleats1[randnum0][j];
			}//for j
		}

		if(short_block[i] == 2){
			var randnum0 = 1 + Math.floor( Math.random() * 10 );
			for( var j= 1; j <= 4; j++ ){
				short_pleats[i][j]=pleats2[randnum0][j];
			}//for j
		}


	}//for i
	


}//function pleatsnum_to_pleats
















//ブロックの+1の中からランダムに選び+2に替える

		        function two_block(long_distance)
		        {
				var randnum = 1 + Math.floor( Math.random() * (long_distance ) );
				if (long_block[randnum] == 1)
				{
				long_block[randnum] = 2;
				}
				else
				{
				two_block(long_distance);
				}
			}









function test2()//メインループ
{



	setInterval("draw_taiyou()",100);


}//function メイン関数







	
	
	
