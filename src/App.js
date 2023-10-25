import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let totalGridSize = 20;

  let intialSnakesPostion = [
    { x: totalGridSize / 2, y: totalGridSize / 2 },
    { x: totalGridSize / 2 + 1, y: totalGridSize / 2 },
  ];

  const [food, setFood] = useState({ x: 5, y: 5 });
  const [snake, setSnake] = useState(intialSnakesPostion);
  const [direction, setDirection] = useState("LEFT");
  const [score,setScore] = useState(0);
  const [gameover,setGameover] = useState (" ");

  function renderBoard() {
    let cellArray = [];
    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        let className = "cell";

        let isFood = food.x === row && food.y === col;

        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);

        let isSnakeHead = snake[0].x === row && snake[0].y === col;

        if (isFood) {
          className = className + " food";
        }

        if (isSnake) {
          className = className + " snake";
        }

        if (isSnakeHead) {
          className = className + " snakeHead";
        }

        let cell = <div className={className} key={`${row}-${col}`}></div>;
        cellArray.push(cell);
      }
    }
    return cellArray;
  }

  function gameOver(){
    setSnake(intialSnakesPostion);
    setScore(0);
    // setGameover(" ");

  }

  function updateGame() {



    if(snake[0].x<0 || snake[0].x>20 || snake[0].y<0 || snake[0].y>20  ){
      
      gameOver()
      setGameover("Game Over");

      return;
    }else{
      setGameover(" ");
    }

    let isBit = snake.slice(1).some((ele)=> ele.x === snake[0].x && ele.y === snake[0].y  );
    if(isBit){
      gameOver()
      setGameover("Game Over");

      return;
    }else{
      setGameover(" ");

    }

    let newSnake = [...snake];

    switch (direction) {
      case "LEFT":
        newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - 1 });
        break;
      case "RIGHT":
        newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1 });
        break;
      case "UP":
        newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y });
        break;
      case "DOWN":
        newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y });
        break;
    }

    let isAteFood = newSnake[0].x === food.x && newSnake[0].y === food.y;

    if(isAteFood){
      setScore((prev) => prev + 1);
      renderFood();
    }else{
      newSnake.pop()
    }
    setSnake(newSnake);
  }

  function updateDirection(e) {
    let code = e.code;

    switch (code) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
    }
  }

  function renderFood(){
    let xPosition = Math.floor(Math.random() * totalGridSize );
    let yPosition = Math.floor(Math.random() * totalGridSize );

    setFood({x: xPosition, y: yPosition });
  }

  useEffect(() => {
    let interval = setInterval(updateGame, 199);
    return () => clearInterval(interval, updateGame);
  });

  useEffect(() => {
    document.addEventListener("keydown", updateDirection);
    return () => clearInterval("keydown", updateDirection);
  });

  return (
    <div className="container">
      <div className="score">
       <h1> SCORE : <span>{score}</span></h1>
        <h1 className="gameover">{gameover}</h1>
      </div>
      <div className="board">{renderBoard()}</div>
    </div>
  );
}

export default App;
