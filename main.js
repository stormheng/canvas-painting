const button = document.querySelector("#button");
const container = document.querySelector(".container");
const icons = document.querySelectorAll(".icon");
const black = document.querySelector("#black");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.documentElement.clientHeight;


let painting = false;
let last = [];
let currentColor = "black";

button.onclick = () => {
  let body = document.getElementsByTagName("body")[0];
  canvas.classList.remove("bg");
  body.removeChild(button);
};

function draw() {
  const reset = lineWidth => {
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
  };
  const drawline = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };

const selectedColor = () => {
  icons.forEach(item => {
    item.classList.remove("selectedIcon");
  });
  const selectedIcon = document
    .querySelector(`#${currentColor}`)
    .querySelector(".icon");
  selectedIcon.classList.add("selectedIcon");
  if (currentColor === "white") {
    console.log(currentColor,1)
    if(body.style.backgroundColor === 'white'){
      currentColor = 'white'
    }else{
     currentColor = colors[colorNum];//将橡皮檫换为背景色
    }
    reset(30);
  } else {
    reset(10);
  }
  console.log(currentColor,2)
};

selectedColor();

// 旋转小风车
let box_block = document.querySelector(".box_block")
let body = document.querySelector("body")
let colorNum = ""
let colors = ['#eb9ea4','#619ac2','#65bf8a','#f5e8b1']
body.style.backgroundColor = 'white'
    console.log(box_block)
    box_block.onclick = () => {
    box_block.style.animation="Positive_rotation 1s linear infinite"
      setTimeout(() => {
        colorNum = Math.floor(Math.random()*5); 
				box_block.style.animation=""
				body.style.backgroundColor = colors[colorNum]
		  }, 1000);
    }




  

  //清空画布
  clear.onclick = () => {
    canvas.height = canvas.height;
    reset(10);
  };

  // 画笔颜色
  container.addEventListener("click", e => {
    $color = e.path.find(el => el.classList && el.classList.contains("color"));
    if ($color) {
      currentColor = $color.id;
      selectedColor();
    }
  });
  container.addEventListener("touchstart", e => {
    $color = e.path.find(el => el.classList && el.classList.contains("color"));
    if ($color) {
      currentColor = $color.id;
      selectedColor();
    }
  });

  //画笔信号
  canvas.onmousedown = e => {
    painting = true;
    last = [e.clientX, e.clientY];
  };
  canvas.ontouchstart = x => {
    painting = true;
    last = [x.touches[0].clientX, x.touches[0].clientY];
  };
  canvas.onmouseup = () => {
    painting = false;
  };
  // 判断设备
  function is_touch_device() {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }

  if (is_touch_device()) {
    let container = document.getElementsByTagName("div")[0];
    canvas.ontouchmove = x => {
      drawline(last[0], last[1], x.touches[0].clientX, x.touches[0].clientY);
      last = [x.touches[0].clientX, x.touches[0].clientY];
    };
  } else {
    canvas.onmousemove = e => {
      if (painting === true) {
        drawline(last[0], last[1], e.clientX, e.clientY);
        last = [e.clientX, e.clientY];
      }
    };
  }
}

