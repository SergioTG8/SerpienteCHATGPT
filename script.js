document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("gameCanvas");
    const context = canvas.getContext("2d");

    const gridSize = 20;
    const gridWidth = canvas.width / gridSize;
    const gridHeight = canvas.height / gridSize;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 10 };
    let direction = "right";
    let score = 0;

    function drawSnake() {
        context.fillStyle = "#00FF00";
        snake.forEach(segment => {
            context.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }

    function drawFood() {
        context.fillStyle = "#FF0000";
        context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    }

    function update() {
        const head = { x: snake[0].x, y: snake[0].y };

        switch (direction) {
            case "up":
                head.y--;
                break;
            case "down":
                head.y++;
                break;
            case "left":
                head.x--;
                break;
            case "right":
                head.x++;
                break;
        }

        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            food = {
                x: Math.floor(Math.random() * gridWidth),
                y: Math.floor(Math.random() * gridHeight)
            };
        } else {
            snake.pop();
        }
    }

    function checkCollision() {
        const head = snake[0];

        if (head.x < 0 || head.x >= gridWidth || head.y < 0 || head.y >= gridHeight) {
            return true; // Collision with wall
        }

        for (let i = 1; i < snake.length; i++) {
            if (snake[i].x === head.x && snake[i].y === head.y) {
                return true; // Collision with itself
            }
        }

        return false;
    }

    function gameLoop() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        if (checkCollision()) {
            alert("Game Over! Puntos obtenidos: " + score);
            snake = [{ x: 10, y: 10 }];
            direction = "right";
            score = 0;
        }

        update();
        drawSnake();
        drawFood();

        setTimeout(gameLoop, 100);
    }

    document.addEventListener("keydown", event => {
        const key = event.key;

        switch (key) {
            case "ArrowUp":
                if (direction !== "down") {
                    direction = "up";
                }
                break;
            case "ArrowDown":
                if (direction !== "up") {
                    direction = "down";
                }
                break;
            case "ArrowLeft":
                if (direction !== "right") {
                    direction = "left";
                }
                break;
            case "ArrowRight":
                if (direction !== "left") {
                    direction = "right";
                }
                break;
        }
    });

    gameLoop();
});

