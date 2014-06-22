
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

	var yoko_plms = new Array();
	var yoko_block = new Array();	
			


//以下、CANVAS記述

function draw_taiyou() {
  /* canvas要素のノードオブジェクト */
  var canvas = document.getElementById('canvassample');
  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
  if ( ! canvas || ! canvas.getContext ) {
    return false;
  }
  
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
	
	//横80の直線があるとする	    
	ctx.strokeStyle = 'rgba(0, 0, 0,1)'; 
	ctx.moveTo(200,100);
	ctx.lineTo(280,100);
	ctx.closePath();  
	ctx.stroke();	
	
	
	var line_distance = 8;//1ブロック10pxとして目指すべき目標点の設定
	
	var pleat = line_distance * 4;//プリーツ（ひだ）値。これを折って不定形なひだを作る。
	
	
	for (var i = 0;i <= 100;i++)
	{

	yoko_plms[i] = 0;  
	yoko_block[i] = 1;

	} 
	
// 8を足し算分解すれば、単純には+1+1+1+1+1+1+1+1になる。
//これを、少し偏らせると、+1+2+0+2+2+0+0+1などになる。

//8に対して、4割くらいの0が発生するとする。


	var zero_block = Math.floor(line_distance * 0.4);//0ブロックの個数
	
	
//+1+2+0+2+2+0+0+1の生成
	
	for (var i = 1;i <= zero_block;i++)
	{

		var randnum = 1 + Math.floor( Math.random() * (line_distance) );
		
		if (yoko_block[randnum] == 1)
		{
		

		yoko_block[randnum] = 0;
		
		two_block(line_distance);
		}

	} 
	
	
	
	for (var i = 1;i <= 8;i++)
	{

console.log(i,yoko_block[i]);

	} 	
	
	//さて、1ブロックは4回の+-から出来ている。
	//今、yoko_block[1]が1だとすると　yoko_plms[1～4] が　+-0+などとなる。
	//これをどうかけばよいか
	
	/*
	4回やって+1になる通り数を考える
	++0-の順番入れ替え
	+000の順番入れ替え
	この2パターンしかない。

	++0-の順番入れ替え
	
	++0-
	++-0
	+0+-
	+0-+
	+-0+
	+-+0
	
	0++-
	0+-+
	0-++
	
	-++0
	-+0+
	-0++
	
	この12通り
	
	+000の順番入れ替え
	
	+000
	0+00
	00+0
	000+
	
	の4通り
	
	計16通り
	
	同様に4回やって+2になる通り数を考える
	++00の順番入れ替え
	+++-の順番入れ替え
	の2パターン
	
	++00の順番入れ替え
	
	++00
	+0+0
	+00+
	
	0++0
	0+0+
	00++
	
	の6通り
	
	+++-の順番入れ替え	
	
	+++-
	++-+
	+-++
	-+++
	
	の4通り
	
	計10通り
	
	
	
	同様に4回やって0になる通り数を考える
	0000の順番入れ替え
	+-+-の順番入れ替え
	+-00の順番入れ替え
	の3パターン
	
	0000の順番入れ替え
	
	0000
	1通り
	
	+-+-の順番入れ替え	
	
	++--
	+-+-
	+--+
	
	-++-
	-+-+
	--++
	
	の6通り
	
	
	+-00の順番入れ替え
	
	+-00
	+0-0
	+00-
	
	-+00
	-0+0
	-00+
	
	0+-0
	0+0-
	0-+0
	0-0+
	00+-
	00-+
	
	12通り
	
	計19通り
	
	これらをあらかじめ配列に入れておき、ランダムに抽出すれば、	
	Σyoko_plms[1～4]を自由に0、+1、+2で集束させられる。	










	*/
	
	
	
	
	
	
	
  
}//draw





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







	
	
	
