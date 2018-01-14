window.onload = function(){
	;(function(){

		// 需求：页面在滚动的时候，动态的设置topbar的透明度
		// 实现：
		// 	（1）给整个页面绑定scroll事件
		// 	（2）得到比例关系：不断变化的卷曲头部/自己设定最大卷曲值 = 不断变化的透明度/最大透明度
		
		// 自己设定一个被卷曲的头部
		var maxTop = 400;
		var topbar = document.querySelector('.jd-header');
		window.addEventListener('scroll', function(e){

			// 得到被卷曲的头部
			// var top = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
			// window.pageYOffset 标准浏览器都支持
			var top = window.pageYOffset;

			if(top >= maxTop) {
				// 一旦到达最大的临界值，将透明度设定在最大
				topbar.style.backgroundColor = 'rgba(201, 21, 35, 0.8)';
			}else{
				// 如果在正常的 区间里面 ，透明度动态变化
				topbar.style.backgroundColor = 'rgba(201, 21, 35, '+ top/maxTop*0.8 +')';
			}

		})

		// 需求：动态设置ul的宽度
		var scrollWrap = document.querySelector('.jd-sc-b > ul');
		var lis = scrollWrap.querySelectorAll('li');

		// 动态设置宽度
		scrollWrap.style.width = lis[0].offsetWidth * lis.length + 'px';
	})();

	;(function(){

		//需求： 倒计时
		// 实现：
		// 1、需要两个时间： 开始时间和结束时间
		// 2、获取时间的时间差 转换成秒数
		// 3、开启定时器，自动秒数自减一 
		// 4、将秒数转换成 时 分 秒
		// 5、将时分秒 设置给对应的元素
		
		var timer = null;
		// 获取当前时间
		var nowDate = new Date();
		// 获取结束时间
		var furDate = new Date('Nov 20 2017 12:00:00');
		// 获取时间差 并且转换成秒数
		var ds = Math.floor((furDate - nowDate)/1000);
		// 获取对应的span元素
		var spans = document.querySelectorAll('.jd-sc-time > span');
		// 最开始的时候调用一次
		time();
		timer = setInterval(time, 1000);
		// 倒计时函数
		function time(){
			// 每一次让时间自减一
			ds--;
			// 如果时间到了，则停止定时器
			if(ds < 0){
				clearInterval(timer);
				// 直接停止代码的往下执行
				return false;
			}

			// 将时间转换成对应的时  分  秒
			// 转换时间的公式：
			// 天数:总秒数/86400
			// 小时：总秒数%86400/3600
			// 分钟：总秒数%3600/60
			// 秒：	总秒数%60
			var h = Math.floor(ds%86400/3600);
			var m = Math.floor(ds%3600/60);
			var s = Math.floor(ds%60);

			// 将时间连成字符串
			var str = addZero(h) + ':' + addZero(m) + ':' + addZero(s);
			// 将时间代入到每一个span里面去	
			for(var i = 0; i < str.length; i++){
				spans[i].innerHTML = str[i];
			}
		}
		// 补0函数
		function addZero(n){
			return n > 9 ? n : '0' + n;
		}
	})();

	;(function(){

		// 需求 ： 自动轮播图

		// 实现：
		// （1）复制第一个li 追加到ul的最后面
		// （2）设置信号量 每一次让ul往上移动一个li的高度

		var newsScroll = document.querySelector('.scroll-wrap');
		var lis = newsScroll.querySelectorAll('li');
		var lisHeight = lis[0].offsetHeight;
		var timer = null;
		// 设置信号量
		var index = 0;
		// 复制第一个li追加到ul里面去
		newsScroll.appendChild(lis[0].cloneNode(true));
		// lisLength = newsScroll.children;
		timer = setInterval(function(){

			// console.log(index,lis.length)
			/*if(index >= lis.length ){
				// 还原成0
				index = 0
				// 去掉过渡
				newsScroll.style.transition = 'none';
				// 直接瞬移回0的位置
				newsScroll.style.transform = 'translateY(0px)';
			}
			// 强制刷新浏览器的内部队列
			lis[0].offsetWidth;*/


			index++;

			// 添加上过渡
			// 注意细节：过渡的时间一定要小于定时器的时间
			newsScroll.style.transition = 'transform .5s';

			newsScroll.style.transform = 'translateY('+ (-index * lisHeight) +'px)';			

		}, 1000);

		// 过渡结束事件 每一次过渡结束该事件会触发
		// 过渡结束事件在浏览器切换出去的时候是不会执行的
		newsScroll.addEventListener('transitionend',function(){
			// 这里不需要- 1 因为在获取lis.length 的时候临时工还没有添加
			if(index >= lis.length ){
				// 还原成0
				index = 0;
				// 去掉过渡
				newsScroll.style.transition = 'none';
				// 直接瞬移会0的位置
				newsScroll.style.transform = 'translateY(0px)';
			}
		})
	})();

	// 轮播图
	;(function(){

		/*css的准备过程
		（1）将所有的图片li进行定位，给ul加上一个最小高（后期在JS里面动态获取）
		（2）让所有的图片li移到屏幕外面去，后期在JS里面初始化图片位置
		（3）设置小圆点（是动态添加的，所以不能直接给ol宽度，而是直接给li设置成行内块，然后让ol设置text-align：center）*/

		/*
			JS的准备工作

			（1）动态设置了ul的高度（将li的高度赋值给ul，在resize的时候重新设置一下）
			（2）动态生成了小圆点（根据li的个数得到）
			（3）初始化三个变量 这三个变量装最开始的下标
				left = lis.length - 1
				center = 0
				right = 1
			（4）执行"归位"
			（5）轮转变量里面的下标 执行"归位" 右边的li永远是替补的，不需要添加过渡
			（6）设置小圆点 = > 将所有的小圆点都去掉current类 给center的小圆点添加上current
				细节：在获取小圆点的时候要在初始化之后
			（7）给carousel绑定touch事件 
			（8）在touchstart里面获取手指的水平落点，并且干掉定时器
			（9）在move里面重新获取手指的水平落点并且减去开始时候的手指落点 得到滑动的距离 
			（10）将这个距离加上left center right的初始位置 （因为这个自带正负，所以不需要考虑方向）
			（11）在move的时候一定要干掉过渡
			（12）在end的时候检测当前滑动是否成功 依据是滑动的距离（dx的绝对值）是否超过屏幕的1/3 或者 滑动的时间小于300毫秒同时滑动的距离大于30
			超过则判断滑动成功 失败则滑动失败
			（13）如果失败 则给left right center 都添加上过渡 进行“归位”
			（14）如果成功 则判断是什么方向 如果是左 则执行下一张的逻辑 反之 则执行上一张的逻辑
			（15）重新开启定时器

		 */

		var carousel = document.querySelector('.carousel');
		var ul = carousel.querySelector('ul');
		var lis = ul.querySelectorAll('li');
		var points = carousel.querySelector('.points');
		var timer = null;
		// 动态设置ul的高度
		ul.style.height = lis[0].offsetHeight + 'px';
		// 缩放屏幕的时候重新去获取li的高度
		window.addEventListener('resize',function(){
			ul.style.height = lis[0].offsetHeight + 'px';
		})

		// 初始化小圆点
		for(var i = 0; i < lis.length; i++){
			var li = document.createElement('li');
			// 如果是第一个li 就添加上current当前类
			if(i === 0){
				li.classList.add('current');
			}
			points.appendChild(li);
		}

		// 初始化了三个变量  三个变量里面装了下标
		var left = lis.length - 1;
		var center = 0;
		var right = 1;

		// 初始化三个位置上的li元素
		setTranslate();
		// 轮播的逻辑
		timer = setInterval(showNext, 1500);

		function showNext(){

			// 轮转下标
			left = center;
			center = right;
			right++;

			// 极值判断
			if(right > lis.length - 1){
				right = 0;
			}

			// 添加过渡
			// 右边永远是替补的那一张 所以不需要给后面的图片添加过渡
			setTransition(1,1,0);

			setTranslate();

			// 设置小圆点
			setPoints();

		}

		function showPrev(){

			// 轮转下标
			right = center;
			center = left;
			left--;

			// 极值判断
			if(left < 0){
				left = lis.length - 1;
			}

			// 添加过渡
			// 左边永远是替补的那一张 所以不需要给后面的图片添加过渡
			setTransition(0,1,1);

			setTranslate();

			// 设置小圆点
			setPoints();

		}


		// 获取小圆点的li元素 （注意：小圆点创建之后在获取）
		var pointsLi = points.querySelectorAll('li');
		function setPoints(){
			for(var i = 0 ; i < pointsLi.length; i++){
				pointsLi[i].classList.remove('current');
			}
			// 给中间的添加上当前类
			pointsLi[center].classList.add('current');
		}


		// 注册touch事件
		// （1）得到滑动的距离
		var startX = 0;
		var startTime = null;
		carousel.addEventListener('touchstart',function(e){
			// 获取开始滑动的时间
			startTime = new Date();
			// 清除定时器
			clearInterval(timer);
			// 获取开始时候的手指落点
			startX = e.changedTouches[0].clientX;
		});
		carousel.addEventListener('touchmove',function(e){

			// 阻止默认事件
			// 阻止掉浏览器默认的滑动切换标签页的功能
			event.preventDefault();

			// 获取滑动的距离 这个距离自带正负
			var dx = e.changedTouches[0].clientX - startX;

			// 在move事件里面不要添加过渡
			setTransition(0,0,0);

			// 让三张图片跟随移动
			// 初始化三个位置上的li元素
			setTranslate(dx);

		})
		carousel.addEventListener('touchend',function(e){

			var dTime = new Date() - startTime;

			var dx = e.changedTouches[0].clientX - startX;
			// 在这里判断滑动是否成功
			// 成功的依据是滑动超过屏幕的1/3 || 滑动的时间小于300ms 同时 滑动的距离大于30
			if(Math.abs(dx) > lis[0].offsetWidth/3 || (dTime < 300 && Math.abs(dx) > 30)){
				// 滑动成功
				if( dx < 0 ){
					// 往左边滑 看到下一张
					showNext();
				}else{
					// 往右边滑 看到上一张
					showPrev();
				}
			}else{
				// 滑动失败
				// 添加过渡
				setTransition(1,1,1);
				// 归位
				setTranslate();
			}
			// 重新启动定时器
			clearInterval(timer);
			timer = setInterval(showNext, 1500);
		})

		function setTransition(a,b,c){
			if(a){
				lis[left].style.transition = 'transform .5s';
			}else{
				lis[left].style.transition = 'none';
			}
			if(b){
				lis[center].style.transition = 'transform .5s';
			}else{
				lis[center].style.transition = 'none';
			}
			if(c){
				lis[right].style.transition = 'transform .5s';
			}else{
				lis[right].style.transition = 'none';
			}
		}
		
		// 归位函数
		function setTranslate(dx){
			dx = dx || 0;
			lis[left].style.transform = 'translateX('+ (-lis[0].offsetWidth + dx) +'px)';
			lis[center].style.transform = 'translateX('+ dx +'px)';
			lis[right].style.transform = 'translateX('+ (lis[0].offsetWidth + dx) +'px)';
		}
		/*lis[left].style.transform = 'translateX('+ (-lis[0].offsetWidth) +'px)';
		lis[center].style.transform = 'translateX(0px)';
		lis[right].style.transform = 'translateX('+ lis[0].offsetWidth +'px)';


		lis[left].style.transform = 'translateX('+ (-lis[0].offsetWidth + dx) +'px)';
		lis[center].style.transform = 'translateX('+ dx +'px)';
		lis[right].style.transform = 'translateX('+ (lis[0].offsetWidth + dx) +'px)';*/
	})();
}





