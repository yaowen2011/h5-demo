window.onload = function(){

	;(function(){

		// 需求 点击checkbox实现checked的类的切换
		
		var checkbox = document.querySelectorAll('.checkbox');
		var inputs = document.querySelectorAll('input[type="checkbox"]');

		checkbox.forEach(function(el,index){

			el.addEventListener('click', function(){
				// 点击谁切换谁
				this.classList.toggle('checked');

			})

		})

		// 点击全选按钮控制下面所有的checkbox
		checkbox[0].addEventListener('click',function(){

			if(this.classList.contains('checked')){
				// 添加上类名
				for(var i = 1; i < checkbox.length; i++){
					//给所有的checkbox添加上checked的类
					checkbox[i].classList.add('checked');
					//给对应的input勾选上
					inputs[i].checked = true;
				}
			}else{
				// 移除类名
				for(var i = 1; i < checkbox.length; i++){
					checkbox[i].classList.remove('checked');
					inputs[i].checked = false;
				}
			}
		})

		// 下面的checkbox选中了之后让全选的按钮也选中
		for(var i = 1; i < checkbox.length; i++){
			checkbox[i].addEventListener('click',function(){
				// 判断所有的checkbox是否都勾选上了
				for(var j = 1; j < checkbox.length; j++){
					// 但凡有一个没有勾选上，那么直接返回
					if(!checkbox[j].classList.contains('checked')){
						// 一旦进入到这个分支里面的话，直接让全选的那个按钮去掉checked类并且
						// 让input框取消选择
						checkbox[0].classList.remove('checked');
						inputs[0].checked = false;
						// 返回
						return ;
					}
				}
				// 如果到了这一步 意味这所有的checkbox都被选中了
				checkbox[0].classList.add('checked');
				inputs[0].checked = true;
			})
		}

	})();


	;(function(){

		// 点击垃圾桶做动画
		var del = document.querySelectorAll('.del');
		var modal = document.querySelector('.modal');
		var cancel = modal.querySelector('.cancel');
		var delT = null;
		for(var i = 0; i < del.length; i++){
			// 给所有的垃圾桶绑定点击事件
			del[i].addEventListener('click',function(){

				// 找到点击的垃圾桶的盖子
				// var delT = this.children[0];
				delT = this.querySelector('.del-t');

				delT.style.transform = 'rotate(-15deg) translateX(-5px)';

				modal.style.display = 'block';

			})
		}

		// 点击取消按钮的时候关闭模态框
		cancel.addEventListener('click',function(){
			modal.style.display = 'none';
			delT.style.transform = 'none';
		})

	})()

	;(function(){

		// 点击加减的效果
		var add = document.querySelectorAll('.add');
		var sub = document.querySelectorAll('.sub');
		var num = document.querySelectorAll('.num');
		var modal = document.querySelector('.modal');

		for(var i  = 0; i < add.length; i++){
			add[i].addEventListener('click',function(){
				// 首先获取到点击的那个元素的对应的value值
				// previousElementSibling 属性不会去获取空文本节本
				// console.log(this.previousElementSibling)
				var val = this.previousElementSibling.children[0].value;
				val++;
				this.previousElementSibling.children[0].value = val;
			})
			sub[i].addEventListener('click',function(){
				var val = this.nextElementSibling.children[0].value;
				val--;
				if(val <= 1){
					// modal.style.display = 'block';
					val = 1;
				}
				this.nextElementSibling.children[0].value = val;
			})
		}



	})()

}