
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

	var yoko_pls = new Array();
	var yoko_block = new Array();	
	var tate_block = new Array();				
				
	var pls = new Array(400);  //始点終点間の距離400まで対応しますよ
	var pls_t = new Array(400);  //始点終点間の距離400まで対応しますよ

	for (var i=0; i<= 400; i++){
		pls[i] = new Array(5);
		pls_t[i] = new Array(5);
	}




//ランダムボード

var pls0 = [
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


var pls1 = [
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


var pls2 = [
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
  
  	var s_x = 200;
	var s_y = 100;
	var e_x = 280;
	var e_y = 100;
  
  
  
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
	
	//横80の直線があるとする	    
	ctx.strokeStyle = 'rgba(0, 0, 0,1)'; 
	ctx.moveTo(s_x,s_y);
	ctx.lineTo(e_x,e_y);
	ctx.closePath();  
	ctx.stroke();	
	
	
	var x_distance = Math.abs(e_x - s_x);
	var y_distance = Math.abs(e_y - s_y);
	
	if( x_distance >= y_distance ){
	var long_distance = x_distance;
	var short_distance = y_distance;
	}
	else{
	var long_distance = y_distance;
	var short_distance = x_distance;	
	}
	
	
	
	var line_distance = 8;//目標への長辺距離
	
	distance_to_pleats(line_distance);//pls[1..8][1..4]に長辺方向のプリーツが生成された


	var tate = 5;//目標への短辺距離

	pleatsnum_to_pleats(line_distance,tate);//pls_t[1..8][1..4]に短辺方向のプリーツが生成された
	



	
  
}//draw




function distance_to_pleats(line_distance)
{

	
	//配列初期化
	for (var i = 0;i <= 100;i++)
	{

	yoko_pls[i] = 0;  
	yoko_block[i] = 1;
	
	pls[i][0] = 0;
	pls[i][1] = 0;
	pls[i][2] = 0;
	pls[i][3] = 0;
	pls[i][4] = 0;
	pls[i][5] = 0;
	
	pls_t[i][0] = 0;
	pls_t[i][1] = 0;
	pls_t[i][2] = 0;
	pls_t[i][3] = 0;
	pls_t[i][4] = 0;
	pls_t[i][5] = 0;

	} 
	


//line_distanceに対して、4割くらいの0ブロックが発生するとする。
	var zero_block = Math.floor(line_distance * 0.4);//0ブロックの個数
	
	
//line_distance個のブロック+1+2+0+2+2+0+0+1の生成
	
	for (var i = 1;i <= zero_block;i++)
	{

		var randnum = 1 + Math.floor( Math.random() * (line_distance) );
		
		if (yoko_block[randnum] == 1)
		{
		

		yoko_block[randnum] = 0;
		
		two_block(line_distance);
		}

	} 
	

	
	//1ブロックは4回の+-から出来ている。

	for ( var i = 1; i <= line_distance; i++)
	{
		if(yoko_block[i] == 0){
			var randnum0 = 1 + Math.floor( Math.random() * 19 );
			for( var j= 1; j <= 4; j++ ){
				pls[i][j]=pls0[randnum0][j];
				}
			}


		if(yoko_block[i] == 1){
			var randnum0 = 1 + Math.floor( Math.random() * 16 );	
			for( var j= 1; j <= 4; j++ ){
				pls[i][j]=pls1[randnum0][j];
				}
			
		}

		if(yoko_block[i] == 2){
			var randnum0 = 1 + Math.floor( Math.random() * 10 );
			for( var j= 1; j <= 4; j++ ){
				pls[i][j]=pls2[randnum0][j];
			}
		}


	}//for i
	//pls[line_distance][1..4]にプリーツが格納された
	
	
}//function distance_to_pleats
	




function pleatsnum_to_pleats(line_distance,tate)
{

	for(var i = 1; i <= line_distance; i++)
	{
	tate_block[i] = 0;
	}//for i
	
	
	for(var i = 1; i <= tate; i++)
	{
	
	var randnum = 1 + Math.floor( Math.random() * (line_distance) );
	
	if (tate_block[randnum] < 2 ){   tate_block[randnum] = tate_block[randnum]+1;   }
	else
	{
		for(var j = 1; j <= line_distance; j++){
		
			if(tate_block[j]  < 2 ){
				tate_block[j] = tate_block[j] + 1;
				break;
			}//if
		 
		}//for j
	}//else
	

	}//for i

	//ここまででブロック割りはできた。プリーツ生成は横のときのを流用できる


	//1ブロックは4回の+-から出来ている。

	for ( var i = 1; i <= line_distance; i++)
	{
		if(tate_block[i] == 0){
			var randnum0 = 1 + Math.floor( Math.random() * 19 );
			for( var j= 1; j <= 4; j++ ){
				pls_t[i][j]=pls0[randnum0][j];
			}//for j
		}

		if(tate_block[i] == 1){
			var randnum0 = 1 + Math.floor( Math.random() * 16 );	
			for( var j= 1; j <= 4; j++ ){
				pls_t[i][j]=pls1[randnum0][j];
			}//for j
		}

		if(tate_block[i] == 2){
			var randnum0 = 1 + Math.floor( Math.random() * 10 );
			for( var j= 1; j <= 4; j++ ){
				pls_t[i][j]=pls2[randnum0][j];
			}//for j
		}


	}//for i
	


}//function pleatsnum_to_pleats
















//ブロックの+1の中からランダムに選び+2に替える

		        function two_block(line_distance)
		        {
				var randnum = 1 + Math.floor( Math.random() * (line_distance ) );
				if (yoko_block[randnum] == 1)
				{
				yoko_block[randnum] = 2;
				}
				else
				{
				two_block(line_distance);
				}
			}






//以上、CANVAS記述


function test2()//メインループ
{



draw_taiyou();


}//function メイン関数







	
	
	
