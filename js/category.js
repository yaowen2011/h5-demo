window.onload = function(){

	// 滑动逻辑
	(function(){

		/*实现：
		（1）让ul能够跟随手指滑动
		（2）在move的时候限制滑动的区间
			往下滑的最大值：maxTop
			往上滑的最大值 -(ul的offsetHeight - aside的offsetHeight + maxTop)
		（3）在end的时候决定是否需要反弹
			往下滑的最大值：0
			往下滑的最大值：-(ul的offsetHeight - aside的offsetHeight)

			反弹：添加过渡，回到最大值的位置
		*/	

		var aside = document.querySelector('.aside');
		var ul = aside.querySelector('ul');

		// 滑动的区间
		var maxDown = 50;
		var maxUp = -(ul.offsetHeight - aside.offsetHeight + maxDown);

		// 反弹区间
		var maxDownBrounce = 0;
		var maxUpBrounce = -(ul.offsetHeight - aside.offsetHeight);
		var startY = 0;
		// 中间变量 存储上一次滑动的位置
		var centerY = 0;

		// 如果ul的高度小于等于aside的高度 那么直接返回
		if(ul.offsetHeight <= aside.offsetHeight){
			// 阻断后续代码的执行
			return false;
		}

		aside.addEventListener('touchstart', function(e){
			// 获取手指开始时候的Y轴的落点
			startY = e.changedTouches[0].clientY;
		})
		aside.addEventListener('touchmove', function(e){

			// 清掉过渡
			ul.style.transition = 'none';

			// 得到差值
			var dy = e.changedTouches[0].clientY - startY;
			// 用一个临时变量进行存储
			var tempY = centerY + dy;

			// 做极值判断
			// 一旦往下滑超出区间 则让这个值等于这个区间的最大值
			if(tempY >= maxDown){
				tempY = maxDown;
			// 一旦往上滑超出区间 则让这个值等于这个区间的最大值
			}else if(tempY <= maxUp){
				tempY = maxUp;
			}

			// 基于上一次的位置在加上当前这一次的距离
			ul.style.transform = 'translateY('+ tempY +'px)';



		})
		aside.addEventListener('touchend', function(e){

			var dy = e.changedTouches[0].clientY - startY;
			// 将最后滑动的位置赋值给centerY 以便下一次基于这个位置在去滑动
			centerY = centerY + dy;

			// 检测是否需要反弹
			if(centerY >= maxDownBrounce){
				// 这里一定注意还原centerY
				centerY = maxDownBrounce;
				// 添加过渡
				ul.style.transition = 'transform .5s';
				ul.style.transform = 'translateY('+ centerY +'px)';
			}else if(centerY <= maxUpBrounce){
				// 这里一定注意还原centerY
				centerY = maxUpBrounce;
				// 添加过渡
				ul.style.transition = 'transform .5s';
				ul.style.transform = 'translateY('+ centerY +'px)';
			}

		})
	})()
	

}