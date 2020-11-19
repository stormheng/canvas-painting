const button = document.querySelector("#button");
const container = document.querySelector(".container");
const icons = document.querySelectorAll(".icon");
const black = document.querySelector("#black");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = document.body.clientWidth;
canvas.height = document.documentElement.clientHeight;

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
      reset(30);
    } else {
      reset(10);
    }
  };

  let painting = false;
  let last = [];
  let currentColor = "black";

  selectedColor();

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
